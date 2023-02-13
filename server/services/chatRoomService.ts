import { Knex } from "knex";

import { User } from "../utils/model";

export class chatRoomService {
    constructor(private knex:Knex) {}

    getUser = async (id: number) => {
      const result = await this.knex<User> ("users")
       .select("username","image","id")
       .where ("id",id)

      const userInfo = result.map(function (el) {return el});
      // const user = userInfo[0]
      
      console.log("userInfo line 14",userInfo)
      return userInfo
    
    }
}