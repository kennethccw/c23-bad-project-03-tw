import express from "express";
import { knex } from "./main";
// import { test } from "./app";

// console.log(test, "3", knex);

// database related
import { UserService } from "./services/UserService";
const userService = new UserService(knex);
import { UserController } from "./controllers/UserController";
export const userController = new UserController(userService);

import { MoodCalendarService } from "./services/MoodCalendarService";
const moodCalendarService = new MoodCalendarService(knex);
import { MoodCalendarController } from "./controllers/MoodCalendarController";
export const moodCalendarController = new MoodCalendarController(moodCalendarService);


// router
import { LogMethodService } from "./services/LogMethodService";
const logMethodService = new LogMethodService(knex);
import { LogMethodController } from "./controllers/LogMethodController";
export const logMethodController = new LogMethodController(logMethodService);
import { userRoutes } from "./router/userRoute";
import { moodCalendarRoutes } from "./router/moodCalendarRoute";
import { logMethodRoutes } from "./router/LogMethodRoute";


export const routes = express.Router();
// Router() = app. => then => routes = app.
routes.use("/user", userRoutes);
routes.use("/mood", moodCalendarRoutes);
routes.use('/method', logMethodRoutes)
