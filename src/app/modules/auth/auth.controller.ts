import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AuthService } from "./auth.services";
import { setAuthCookie } from "../../utils/setAuthCookie";

const credentialsLogin = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.credentialsLogin(req.body);

  setAuthCookie(res, result);

  res.status(200).json({
    success: true,
    message: "Login successfull",
    result,
  });
});

const logout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.status(200).json({
    success: true,
    message: "You are Logged Out",
    data: null,
  });
});

const getUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.getUser();

  res.status(200).json({
    success: true,
    message: "User retrieved",
    result,
  });
});

export const AuthController = {
  credentialsLogin,
  getUser,
  logout
};
