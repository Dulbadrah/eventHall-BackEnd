import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { createAccessToken } from "../../utils/token"; // таны токен үүсгэх функц

const prisma = new PrismaClient();

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

   
    if (!email || !password) {
      return res.status(400).json({ message: "Email болон нууц үгээ оруулна уу" });
    }

   
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Ийм хэрэглэгч байхгүй" });
    }

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Нууц үг буруу байна" });
    }

    const token = createAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    
    res.status(200).json({
      message: "Login successful",
      token, 
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
