const prisma = require("../db");
const { avgRating } = require("../utlis/authHelper");


// user accessing all stores 
exports.allStores = async(req, res)=>{
    try{
        const userId = req.user.id; 
        const search = req.query.search || "";

        const whereConditions = {};
        if (search) {
            whereConditions.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { address: { contains: search, mode: "insensitive" } },
            ]
        }

        const stores = await prisma.store.findMany({
            where : whereConditions,
            orderBy : {name : "asc"},
            include : {ratings : true},
        });

        const result = stores.map((store) =>{
            const rating = avgRating(store.ratings);

            // Check if the currently logged-in user already rated this store
            const myRatingEntry = store.ratings.find((r) => r.userId === userId);
            const userSubmittedRating = myRatingEntry ? myRatingEntry.score : null;

            return {
                id: store.id,
                name: store.name,
                address: store.address,
                overallRating: rating,
                userSubmittedRating: userSubmittedRating,
            };
        })
        return res.status(200).json(result);

    }catch(err){
        return res.status(500).json({err : err.message})
    }
}

exports.updateRating = async(req, res)=>{
    try{
        const userId = req.user.id;
        const {storeId, score} = req.body;

        if(!storeId || !score){
            return res.status(400).json({err : "Both Store id and score are required"})
        }

        const parsedScore = parseInt(score, 10);
        if(!parsedScore || parsedScore < 1 || parsedScore > 5){
            return res.status(400).json({err : "Rating must be integer between 1 to 5"})
        }

        const store = await prisma.store.findUnique({where : {id : storeId}});
        if(!store)
            return res.status(404).json({err : "Store not found"})

        const saveRating = await prisma.rating.upsert({
            where: {
                userId_storeId: {
                userId: userId,
                storeId: storeId,
                },
            },
            update: {
                score : parsedScore,
            },
            create: {
                userId: userId,
                storeId: storeId,
                score: parsedScore,
            },
        })
        return res.status(200).json(saveRating);

    }catch(err){
        return res.status(500).json({err : err.message})
    }
}

exports.ownerDashboard = async(req,res)=>{
    try{
        const ownerId = req.user.id;

        const store = await prisma.store.findUnique({
            where : {ownerId : ownerId},
            include : {
                ratings : {
                    include : {
                        user :{
                            select : {
                                id: true,
                                name: true,
                                email: true,
                            }
                        }
                    }
                }
            }
        })

        if (!store) 
            return res.status(404).json({ error: "No store found assigned to your account." });
        
        const allRatings = store.ratings;

        // user who rated store
        const raterList = allRatings.map((entry) => ({
            ratingId: entry.id,
            score: entry.score,
            updatedAt: entry.updatedAt,
            user: {
                id: entry.user.id,
                name: entry.user.name,
                email: entry.user.email,
            },
        }))

        res.status(200).json({
            storeName: store.name,
            storeAddress: store.address,
            averageRating: avgRating(allRatings),
            totalReviews: allRatings.length,
            ratings: raterList,
        })
    }
    catch(err){
        return res.status(500).json({err : err.message})
    }
}