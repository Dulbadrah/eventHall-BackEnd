import { Request, Response } from "express";
import prisma from "../../utils/prisma";

export default async function Venue(req: Request, res: Response) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const venue = await prisma.venue.findUnique({
        where: { id: Number(id) },
        include: {
          // Эзэн
          Super_Admin: true,      // Super Admin
          admins: {               // Админууд (junction table)
            include: { admin: true },
          },
          amenities: true,        // Давуу талууд
          bookings: {
            include: {
              user: true,         // Захиалга хийсэн хүн
            },
          },
          reviews: {
            include: {
              user: true,         // Сэтгэгдэл бичсэн хүн
            },
          },
          images: true,            // Зургууд
          tags: {                  // Tags
            include: { tag: true },
          },
        },
      });

      if (!venue) {
        return res.status(404).json({ message: "Venue not found" });
      }

      res.status(200).json(venue);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
