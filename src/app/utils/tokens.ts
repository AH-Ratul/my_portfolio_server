import { envConfig } from "../config";
import { generateTokne } from "./jwt";
import { IUser } from "./seedSuperAdmin";

export const createToken = (user: Partial<IUser>) => {
  const jwtPayload = {
    id: user.id,
    email: user.email,
  };

  const accessToken = generateTokne(
    jwtPayload as unknown as string,
    envConfig.JWT_SECRET,
    envConfig.JWT_EXPIRES
  );

  return { accessToken };
};
