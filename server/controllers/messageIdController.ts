import {messageIdService} from "../services/messageIdService"
import { Request, Response} from "express"


export class messageIdController {
    constructor(private messageIdService:messageIdService) {}

    getAdmin= async (req: Request, res: Response) => {
         
       const admin = await this.messageIdService.getAdmin();
       console.log("controller=",admin)
       res.json(admin)
    }
    
}