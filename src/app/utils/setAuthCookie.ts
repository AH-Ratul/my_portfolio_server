import { Response } from "express";

interface AuthToken {
  accessToken?: string;
}

export const setAuthCookie = (res: Response, tokenInfo: AuthToken) => {
  res.cookie("accessToken", tokenInfo, {
    httpOnly: true,
    secure: false,
  });
};
