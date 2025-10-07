import { Prisma } from "@prisma/client";
import { envConfig } from "../config";
import { prisma } from "../config/db";
import bcrypt from "bcryptjs";

export interface IUser {
  id?: number, 
  name?: string;
  email: string;
  password: string;
};

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdmin = await prisma.user.findUnique({
      where: { email: envConfig.SUPER_ADMIN_EMAIL },
    });

    if (isSuperAdmin) {
      console.log("Super Admin already exists...");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      envConfig.SUPER_ADMIN_PASSWORD as string,
      Number(process.env.SALT)
    );

    const payload: Prisma.UserCreateInput = {
      name: "ADMIN",
      email: envConfig.SUPER_ADMIN_EMAIL as string,
      password: hashedPassword,
    };

    const superAdmin = await prisma.user.create({ data: payload});

    if (superAdmin) {
      console.log("Super Admin created..");
    }
  } catch (error) {
    console.log("super error", error);
  }
};
