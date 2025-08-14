import express from "express";
import createVenue from "../controller/venues/createVenue";
import getVenue from "../controller/venues/[id]";

const venueRouter = express.Router();

venueRouter.post("/", createVenue);
venueRouter.get("/:id", getVenue);

export default venueRouter;
