import { Request, Response } from "express";
import prisma  from "../../utils/prisma";
import bcrypt from "bcrypt";


export const SignUp = async (req: Request, res: Response) => {
  const { email, password, name, birthDate, phoneNumber, address } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 8)
  try {
    const user = await prisma.user.create({
        data:{
            email,
            password: hashedPassword,
            name,
            birthDate: new Date(birthDate),
            phoneNumber,
            address,

        }
      
    });
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "api error", error });
  }
};