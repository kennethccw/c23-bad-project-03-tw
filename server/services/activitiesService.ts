import type { Knex } from "knex";
import { moodLog } from "../utils/model";

export class moodLogService {
  constructor(private knex: Knex) {}

  

  //get past 7 days mood from DB
  getPast7DaysHappy = async (id: number) => {
    

    const result = await this.knex<moodLog>("mood_emoticon")
        .count("emotion_map_id")
        .where("user_id", id)
        .where("emotion_map_id",1)
        .whereBetween("created_at", [new Date(new Date().setDate(new Date().getDate()-6)), new Date()])
       
        const numberOfHappy = result.map(function (el) {return el.count});
        
        
        
    return numberOfHappy
  };

  getPast7DaysSurprised = async (id: number) => {
    

    const result = await this.knex<moodLog>("mood_emoticon")
        .count("emotion_map_id")
        .where("user_id", id)
        .where("emotion_map_id", 2)
        .whereBetween("created_at", [new Date(new Date().setDate(new Date().getDate()-6)), new Date()])
       
        

        const numberOfSurprised = result.map(function (el) {return el.count});
        
        
        
    return numberOfSurprised
  };

  getPast7DaysNeutral = async (id: number) => {
    

    const result = await this.knex<moodLog>("mood_emoticon")
        .count("emotion_map_id")
        .where("user_id", id)
        .where("emotion_map_id", 3)
        .whereBetween("created_at", [new Date(new Date().setDate(new Date().getDate()-6)), new Date()])
       
        const numberOfNeutral = result.map(function (el) {return el.count});
       
        
        
    return numberOfNeutral
  };

  getPast7DaysSad = async (id: number) => {
    
    const result = await this.knex<moodLog>("mood_emoticon")
        .count("emotion_map_id")
        .where("user_id", id)
        .where("emotion_map_id", 4)
        .whereBetween("created_at", [new Date(new Date().setDate(new Date().getDate()-6)), new Date()])
       
        const numberOfSad = result.map(function (el) {return el.count});
        
        
        
    return numberOfSad
  };

  getPast7DaysAngry = async (id: number) => {
   

    const result = await this.knex<moodLog>("mood_emoticon")
        .count("emotion_map_id")
        .where("user_id", id)
        .where("emotion_map_id", 5)
        .whereBetween("created_at", [new Date(new Date().setDate(new Date().getDate()-6)), new Date()])
       
        const numberOfAngry = result.map(function (el) {return el.count});
        
        
        
    return numberOfAngry
  };

  getActivities = async (id:number | null) => {
    
    const result = await this.knex<moodLog>("mood_emoticon")
    // .count("emotion_map_id")
    .max("emotion_map_id")
    .where("user_id", id)
    .whereBetween("created_at", [new Date(new Date().setDate(new Date().getDate()-6)), new Date()])
    const maxOfMood = result.map(function (el) {return el.max});
    
    const number = maxOfMood[0]
    
    const activitiesREsult = await this.knex<moodLog>("activities")
    .select()
    .where("emotion_map_id",number)
    
    return activitiesREsult

  }




}




