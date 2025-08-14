import { Request, Response } from "express";
import prisma from "../../utils/prisma";


export default async function createVenue(req: Request, res: Response) {
  try {
    const {
      name,
      description,
      location,
      capacity,
      price,
      rating,
      amenities,
      images,
      tags,
      Super_AdminId,
      adminId,
    } = req.body;
    const newVenue = await prisma.venue.create({
      data: {
        name,
        description,
        location,
        capacity: Number(capacity),
        price: Number(price),
        rating: Number(rating),
        images: images || [],
        tags: tags || [],
        Super_AdminId: Number(Super_AdminId),
        adminId: Number(adminId),
        amenities: {
          connect: amenities?.map((id: number) => ({ id })) || [],
        },
      },
      include: { amenities: true, admin: true, Super_Admin: true },
    });

    return res.status(201).json(newVenue);
  } catch (error) {
    console.error("Venue create error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
