import type { Request, Response } from "express";

import { MoodCalendarService } from "../services/MoodCalendarService";

export class MoodCalendarController {
  constructor(private moodCalendarService: MoodCalendarService) {}

  mottos = async (req:Request, res: Response) => {
    if (req.query.eid) {
    const eid = parseInt(req.query.eid as string);
    const getMottosResult = await this.moodCalendarService.getMottos(eid)
    console.log(getMottosResult.length)
    const randomNumber = Math.floor(Math.random() * getMottosResult.length)
    console.log(randomNumber)
    console.log(getMottosResult[randomNumber])
    res.status(200).json(getMottosResult[randomNumber])
    return
  } else {
    const getMottosResult = await this.moodCalendarService.getAllMottos()
    console.log(getMottosResult.length)
    const randomNumber = Math.floor(Math.random() * getMottosResult.length)
    console.log(randomNumber)
    console.log(getMottosResult[randomNumber])
      res.status(200).json(getMottosResult[randomNumber])
    }
  }

  calendar = async (req: Request, res: Response) => {
    const uid = req.session.user.id as number;
    const dateString = req.query.date as string
    // const queryResult = await this.moodCalendarService.calendar(uid);

    // console.log(queryResult);
    // const moodDiaryArr = [];
    // const moodVoiceMemoArr = [];
    // const moodEmoticonArr = [];
    // for (const item of queryResult) {
      // if (item.mood_diary_id) {
        // moodDiaryArr.push(await this.moodCalendarService.diary(item.mood_diary_id));
        if (dateString) {
          const selectedDiary = await this.moodCalendarService.selectedDiary(uid, dateString);
          const selectedEmoticon = await this.moodCalendarService.selectedDEmoticon(uid, dateString);
          const selectedVoiceMemo = await this.moodCalendarService.selectedVoiceMemo(uid, dateString);
          res.status(200).json({selectedDiary, selectedEmoticon, selectedVoiceMemo})
          return
        }

        const moodDiaryArr = await this.moodCalendarService.diary(uid);
        // console.log(moodDiaryArr);
      // }
      // if (item.mood_voice_memo_id) {
        // moodVoiceMemoArr.push(await this.moodCalendarService.voiceMemo(item.mood_voice_memo_id));
        const moodVoiceMemoArr = await this.moodCalendarService.voiceMemo(uid);
        // console.log(moodVoiceMemoArr);
      // }
      // if (item.mood_emoticon_id) {
        // moodEmoticonArr.push(await this.moodCalendarService.emoticon(item.mood_emoticon_id));
        const moodEmoticonArr = await this.moodCalendarService.emoticon(uid);
        // console.log(moodEmoticonArr);
      // }
    // }
    const allMoodLog = { moodDiaryArr, moodVoiceMemoArr, moodEmoticonArr };
    // console.log(allMoodLog);
    res.status(200).json({ message: "successful", allMoodLog });
  };
}
