import {moodlogController} from "../main"
import { Router } from "express"

// assume path start with "/moodlog"
export const moodLogRoutes = Router();

// moodLogRoutes.get("/getUser",(moodlogController.getUser))
moodLogRoutes.get("/past7DaysHappy",(moodlogController.getPast7DaysHappy))
moodLogRoutes.get("/past7DaysSurprised",(moodlogController.getPast7DaysSurprised))
moodLogRoutes.get("/past7DaysNeutral",(moodlogController.getPast7DaysNeutral))
moodLogRoutes.get("/past7DaysSad",(moodlogController.getPast7DaysSad))
moodLogRoutes.get("/past7DaysAngry",(moodlogController.getPast7DaysAngry))
moodLogRoutes.get("/getActivities",(moodlogController.getActivities))
