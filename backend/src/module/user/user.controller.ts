import { Request, Response } from "express";
import { UserInterface } from "./user.interface";
import { userService } from "./user.services";
import { error } from "console";

const userCreateController = async (req: Request, res: Response) => {
  const result = await userService.userCreateService(req.body);
  if (result) {
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } else {
    res.status(401).json({
      success: false,
      message: "User not created",
    });
    console.log(error);
  }
};

const userFindByEmailController = async (req: Request, res: Response) => {
  const result = await userService.userFindByEmailService(req.params.email);
  if (result) {
    res.status(200).json({
      success: true,
      message: "User found successfully",
      data: result,
    });
  } else {
    res.status(401).json({
      success: false,
      message: "User not found",
    });
  }
};

export const userController = {
  userCreateController,
  userFindByEmailController,
};
