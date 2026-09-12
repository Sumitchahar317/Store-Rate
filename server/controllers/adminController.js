const prisma = require("../db");
const { hasedPassword, jwtToken, avgRating } = require("../utlis/authHelper");

exports.getDashboardStats = async(req, res)=>{
    try{
        const [totalUsers, totalStores, totalRatings] = await Promise.all([
            prisma.user.count(),
            prisma.store.count(),
            prisma.rating.count(),
        ])

        return res.status(200).json({totalUsers, totalStores, totalRatings})
    }
    catch(err){
        return res.status(500).json({ error: err.message });
    } 
}

exports.createUser = async(req, res)=>{
    try{
        const {name, email, password, address, role} = req.body;
        if(!name || !email || !password || !role || !address)
            return res.status(400).json({err : "All fields are required"})
        
        const Email = email.toLowerCase().trim();

        const existing = await prisma.user.findUnique({where : {email: Email}});
        if(existing)
            return res.status(400).json({ error: "Email already in use." });

        const passwordHash = await hasedPassword(password);

        const newUser = await prisma.user.create({
            data : {
                name : name.trim(),
                email : Email,
                passwordHash,
                address : address,
                role : role || "USER",
            },
            select: {
                id: true,
                name: true,
                email: true,
                address: true,
                role: true,
                createdAt: true,
            },
        })
        const token = jwtToken(newUser.id, newUser.name, newUser.email, newUser.role);

        return res.status(201).json({token : token, user : newUser}) 

    }catch(err){
        return res.status(500).json({ error: err.message });
    }
}

exports.createStore = async(req, res)=>{
    try{
        const {name, email, address, ownerId} = req.body;
        if(!name || !email || !address)
            return res.status(400).json({ error: "Please provide all required fields." });

        const Email = email.toLowerCase().trim();

        const existing = await prisma.store.findUnique({where : {email: Email}});
        if(existing)
            return res.status(400).json({ error: "Store email already exist." });

        if(ownerId){
            const owner = await prisma.user.findUnique({where : {id : ownerId}})
            if(!owner || owner.role !== "STORE_OWNER")
                return res.status(400).json({ error: "Selected user is not a valid store owner." });
        }

        const store = await prisma.store.create({
            data: {
                name: name.trim(),
                email: email.toLowerCase().trim(),
                address: address.trim(),
                ownerId: ownerId || null,
            },
        })
        return res.status(201).json(store);
    }catch(err){
       return res.status(400).json({ error: err.message }); 
    }
}

exports.getStores = async (req, res) =>{
    try{
        const search = req.query.search || "";
        const sortBy = req.query.sortBy || "name";
        const order = req.query.order === "desc" ? "desc" : "asc";

        // Creates an empty JavaScript object -  Dynamic Search Filters
        const whereConditions = {};
        if (search) {
        whereConditions.OR = [ // A store will be included if it matches any one of the conditions in the list.
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { address: { contains: search, mode: "insensitive" } }
        ] //Checks if search appears anywhere as a substring.
        }

        // Fetch all stores with their ratings from DB
        const stores = await prisma.store.findMany({
            where: whereConditions,
            orderBy: { [sortBy]: order },
            include: { ratings: true },
        });

        const result = stores.map((store) => {
        return {
            id: store.id,
            name: store.name,
            email: store.email,
            address: store.address,
            rating: avgRating(store.ratings),
            totalRatings: store.ratings.length
        }
        })

        return res.status(200).json(result)

    }catch(err){
       return res.status(500).json({ error: err.message }); 
    }
}

exports.getUsers = async(req,res)=>{
    try{
        const search = req.query.search || "";
        const role = req.query.role || "";
        const sortBy = req.query.sortBy || "name";
        const order = req.query.order === "desc" ? "desc" : "asc";

        const whereConditions = {};

        if (search) {
            whereConditions.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
                { address: { contains: search, mode: "insensitive" } },
            ]
        }

        if (role) whereConditions.role = role

        // Fetch users, store & it's ratings
        const users = await prisma.user.findMany({
            where: whereConditions,
            orderBy: { [sortBy]: order },
            include: {
                store: {
                    include: { ratings: true },
                },
            },
        })

        const result = users.map((user) => {

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            address: user.address,
            role: user.role,
            rating: user.store ? avgRating(user.store.ratings) : null,
        }
        })
        return res.status(200).json(result);

    }catch(err){
        return res.status(500).json({ error: err.message });
    }
}
