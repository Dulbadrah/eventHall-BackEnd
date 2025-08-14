import { Request, Response } from "express";
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || Role.USER,
      },
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Create user error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
