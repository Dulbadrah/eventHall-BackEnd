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
      adminIds, // олон админ ID-г массив-аар авах
    } = req.body;

    // 1. Venue үүсгэх
    const newVenue = await prisma.venue.create({
      data: {
        name,
        description,
        location,
        capacity: Number(capacity),
        price: Number(price),
        rating: rating ? Number(rating) : undefined,
        Super_AdminId: Number(Super_AdminId),
        amenities: {
          connect: amenities?.map((id: number) => ({ id })) || [],
        },
        images: {
          create: images?.map((url: string) => ({ url })) || [],
        },
        tags: {
          create: tags?.map((tagId: number) => ({ tagId })) || [],
        },
      },
      include: {
        amenities: true,
        images: true,
        tags: { include: { tag: true } },
        Super_Admin: true,
        admins: { include: { admin: true } }, // junction table-ын админ
      },
    });

    // 2. Admins-г junction table-д холбох
    if (adminIds?.length) {
      await Promise.all(
        adminIds.map((adminId: number) =>
          prisma.venueAdmin.create({
            data: {
              venueId: newVenue.id,
              adminId: Number(adminId),
            },
          })
        )
      );
    }

    return res.status(201).json(newVenue);
  } catch (error) {
    console.error("Venue create error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
