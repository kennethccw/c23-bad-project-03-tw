import { Knex } from "knex";
import { User } from "../utils/model";

export class messageIdService {
    constructor(private knex:Knex) {}

    getAdmin = async () => {
      const result = await this.knex<User> ("users")
       .select("username","image","id")
       .whereLike("level",'%adm%' )

      console.log("service result=",result)
      return result
    
    }
}