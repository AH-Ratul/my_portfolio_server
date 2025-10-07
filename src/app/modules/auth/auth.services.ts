import { prisma } from "../../config/db";
import { AppError } from "../../errorHelpers/AppError";
import { IUser } from "../../utils/seedSuperAdmin";
import bcrypt from "bcryptjs";
import { createToken } from "../../utils/tokens";

const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  const isUserExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!isUserExists) {
    throw new AppError(400, "Email doesn't exists");
  }

  const isPasswordMatched = await bcrypt.compare(
    password as string,
    isUserExists.password as string
  );

  if (!isPasswordMatched) {
    throw new AppError(400, "Incorrect Password");
  }

  const userToken = createToken(isUserExists as IUser);

  const { password: pass, ...rest } = isUserExists;

  return {
    accessToken: userToken.accessToken,
    user: rest,
  };
};

const getUser = async () => {
  const user = await prisma.user.findMany();

  return user;
};

export const AuthService = {
  credentialsLogin,
  getUser
};
