import { Server } from "http";
import { app } from "./app";
import { prisma } from "./app/config/db";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";
import { envConfig } from "./app/config";

let server: Server;

async function connectToDB() {
  try {
    await prisma.$connect();
    console.log("Database Connected");
  } catch (error) {
    console.log("DB connection failed ->", error);
    process.exit(1);
  }
}

async function main() {
  try {
    await connectToDB();
    server = app.listen(envConfig.PORT, () => {
      console.log(`Server is listening on Port ${envConfig.PORT}`);
    });
  } catch (error) {
    console.error("server error => ", error);
    process.exit(1);
  }
}

(async () => {
  await main();
  await seedSuperAdmin();
})();
