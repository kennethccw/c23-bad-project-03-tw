import {chatRoomService } from "../services/chatRoomService"
import { Request, Response} from "express"

export class chatRoomController {
    constructor(private chatRoomService: chatRoomService) {}

    getUser = async(req: Request, res: Response) =>{
        const id = req.session['user'].id as number
       
        const getUser = await this.chatRoomService.getUser(id)
        res.json(getUser)
    }
}