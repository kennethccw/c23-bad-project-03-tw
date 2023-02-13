import { Router } from "express";

import { messageidController } from "../main";

// assume path start with "/messageId"
export const messageIdRoute = Router();

messageIdRoute.get("/getAdmin",(messageidController.getAdmin))
