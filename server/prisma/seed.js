const prisma = require("../db");
const bcrypt = require("bcrypt");

async function main() {
  console.log("Seeding initial database data...");

  const salt = await bcrypt.genSalt(10);
  const defaultPasswordHash = await bcrypt.hash("Admin@12345", salt);

  // 1. Create Default System Administrator (Name: 20-60 chars)
  const adminEmail = "systemadmin@storepulse.com";
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "System Administrator Admin", 
      email: adminEmail,
      passwordHash: defaultPasswordHash,
      address: "Headquarters, Main Admin Block, Tech Park, City Center",
      role: "ADMIN",
    },
  });

  console.log("Admin user created:", admin.email);

  // 2. Create a Store Owner account
  const ownerEmail = "john.owner@storepulse.com";
  const owner = await prisma.user.upsert({
    where: { email: ownerEmail },
    update: {},
    create: {
      name: "Johnathan Owner Person", 
      email: ownerEmail,
      passwordHash: defaultPasswordHash,
      address: "123 Business Avenue, Suite 400, Tech City",
      role: "STORE_OWNER",
    },
  });

  console.log("Store owner created:", owner.email);

  // 3. Create a Demo Store assigned to this owner
  const storeEmail = "central.bakery@storepulse.com";
  const store = await prisma.store.upsert({
    where: { email: storeEmail },
    update: {},
    create: {
      name: "Central Gourmet Artisan Bakery", 
      email: storeEmail,
      address: "Shop 12, Ground Floor, Central Mall, Downtown",
      ownerId: owner.id,
    },
  });

  console.log("Store created:", store.name);

  // 4. Create a Normal User
  const userEmail = "regular.customer@storepulse.com";
  const normalUser = await prisma.user.upsert({
    where: { email: userEmail },
    update: {},
    create: {
      name: "Alexander", 
      email: userEmail,
      passwordHash: defaultPasswordHash,
      address: "Flat 4B, Sunrise Apartments, Green Valley Road",
      role: "USER",
    },
  });

  console.log("Normal user created:", normalUser.email);

  // 5. Submit an initial rating from the normal user
  await prisma.rating.upsert({
    where: {
      userId_storeId: {
        userId: normalUser.id,
        storeId: store.id,
      },
    },
    update: {},
    create: {
      userId: normalUser.id,
      storeId: store.id,
      score: 5,
    },
  });

  console.log("Initial rating inserted.");
  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });