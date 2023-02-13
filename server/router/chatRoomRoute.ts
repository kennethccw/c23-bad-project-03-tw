import { Router } from "express";
import { chatroomController } from "../main"



// assume path start with "/chatRoom"
export const chatRoomRoute = Router();

chatRoomRoute.get("/getUser",(chatroomController.getUser)) 
