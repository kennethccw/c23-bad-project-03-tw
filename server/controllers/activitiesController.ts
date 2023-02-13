import { moodLogService } from "../services/activitiesService";
import { Request, Response } from "express";

export class moodLogController {
  constructor(private moodLogService: moodLogService) {}



  getPast7DaysHappy = async (req: Request, res: Response) => {
    const id = req.session["user"].id as number
    
    const past7DaysHappy = await this.moodLogService.getPast7DaysHappy(id);
    
    res.json(past7DaysHappy);
  };

  getPast7DaysSurprised = async (req: Request, res: Response) => {
    const id = req.session["user"].id as number
    
    const past7DaysSurprised = await this.moodLogService.getPast7DaysSurprised(id);
    
    res.json(past7DaysSurprised);
  };

  getPast7DaysNeutral = async (req: Request, res: Response) => {
    const id = req.session["user"].id as number
    
    const past7DaysNeutral = await this.moodLogService.getPast7DaysNeutral(id);
    
    res.json(past7DaysNeutral);
  };

  getPast7DaysSad = async (req: Request, res: Response) => {
    const id = req.session["user"].id as number
    
    const past7DaysSad = await this.moodLogService.getPast7DaysSad(id);
    
    res.json(past7DaysSad);
  };

  getPast7DaysAngry = async (req: Request, res: Response) => {
    const id = req.session["user"].id as number
    
    const past7DaysAngry = await this.moodLogService.getPast7DaysAngry(id);
    
    res.json(past7DaysAngry);
  };

  getActivities = async (req:Request, res:Response) => {
    const id = req.session["user"].id
    
    const getActivities = await this.moodLogService.getActivities(id);
    
    res.json(getActivities)

  }

}
