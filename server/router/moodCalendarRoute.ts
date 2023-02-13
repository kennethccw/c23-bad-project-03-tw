import express from "express";
// import { UserController } from "../controllers/UserController";
// import { UserService } from "../services/UserService";
// import { knex } from "../main";
import { moodCalendarController } from "../routes";

export const moodCalendarRoutes = express.Router();

// console.log("hi2");
moodCalendarRoutes.get("/calendar", moodCalendarController.calendar);
moodCalendarRoutes.get("/mottos", moodCalendarController.mottos);
