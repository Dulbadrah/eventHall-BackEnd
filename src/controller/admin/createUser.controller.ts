import { Request, Response } from "express";
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, birthDate, phoneNumber, address } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Бүх талбарыг бөглөнө үү" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "ийм мэйл бүртгэлтэй байна" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const finalRole = Object.values(Role).includes(role) ? role : Role.ADMIN;

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: finalRole,
        birthDate,
        phoneNumber,
        address,
      },
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error: any) {
    console.error("Create user error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
