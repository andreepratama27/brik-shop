const bcrypt = require('bcrypt')

const users = [{
  name: "Admin Brik",
  email: "admin@brik.id",
  password: bcrypt.hashSync('admin123', 10)
}];

const category = [{
  id: 1,
  name: 'Buah'
}]

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.user.deleteMany();
    console.log("Deleted records in user table");

    await prisma.category.deleteMany();
    console.log("Deleted records in category table");

    await prisma.$queryRaw`ALTER TABLE User AUTO_INCREMENT = 1`;
    console.log("reset product auto increment to 1");

    await prisma.$queryRaw`ALTER TABLE Category AUTO_INCREMENT = 1`;
    console.log("reset category auto increment to 1");

    await prisma.user.createMany({
      data: users,
    });
    console.log("Added user data");

    await prisma.category.createMany({
      data: category,
    });
    console.log("Added category data");

  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
