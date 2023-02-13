import type { Request, Response } from "express";
import formidable from "formidable";
import { readFile } from "fs/promises";
import fetch from "cross-fetch";
import { LogMethodService } from "../services/LogMethodService";
import path from "path";

export class LogMethodController {
  constructor(private logMethodService: LogMethodService) {}

  checkDiary = async (req: Request, res: Response) => {
    const uid = req.session.user.id as number;
    const result = await this.logMethodService.isLoggedToday(uid);
    if (result) {
      if (result.mood_diary_id) {
        res.status(200).json(result.mood_diary_id);
        return;
      }
    }
    res.status(200).json({ mood_diary_id: "" });
  };

  createEmotionForDiary = async (req: Request, res: Response) => {
    console.log("into create emotion");
    const uid = req.session.user.id as number;
    const eid = parseInt(req.query.eid as string);
    const dateString = req.query.date as string;
    // console.log(eid)
    console.log(dateString);
    const isLoggedMood = await this.logMethodService.isLoggedToday(uid);
    // console.log(isLoggedMood, "printing is logged mood");

    if (dateString) {
      console.log(dateString, "hi undefined");
      await this.logMethodService.updatePastDiaryEmotion(uid, eid, dateString);
      res.status(200).json({ message: "successful upload" });
      return;
    }

    if (isLoggedMood) {
      for (const key in isLoggedMood) {
        if (key === "mood_diary_id" && isLoggedMood[key] !== null) {
          const { emotion_map_id, id } = await this.logMethodService.updateDiaryEmotion(uid, eid);
          await this.logMethodService.diaryCalendar(uid, emotion_map_id, id);

          res.status(200).json({ message: "You have logged mood today!!!" });
          return;
        }
        if (key === "mood_voice_memo_id" && isLoggedMood[key] !== null) {
          await this.logMethodService.removeVoiceMemo(uid);
          await this.logMethodService.removeLogFromCalendar(uid);
        }
        if (key === "mood_emoticon_id" && isLoggedMood[key] !== null) {
          await this.logMethodService.removeEmoticon(uid);
          await this.logMethodService.removeLogFromCalendar(uid);
        }
      }
    }
    const { emotion_map_id, id } = await this.logMethodService.diaryEmotion(uid, eid);
    await this.logMethodService.diaryCalendar(uid, emotion_map_id, id);
    res.status(200).json({ message: "successful upload" });
  };

  showPastDiary = async (req: Request, res: Response) => {
    const uid = req.session.user.id as number;
    const dateString = req.params.date;
    const content = await this.logMethodService.showPastDiary(uid, dateString);
    res.status(200).json(content);
  };
  showPastEmoticon = async (req: Request, res: Response) => {
    const uid = req.session.user.id as number;
    const dateString = req.params.date;
    const emoji = await this.logMethodService.showPastEmoticon(uid, dateString);
    console.log(emoji, "this is emoji");
    res.status(200).json(emoji);
  };

  createDiary = async (req: Request, res: Response) => {
    console.log("create diary");
    const uid = req.session.user.id as number;
    const dateString = req.params.date;

    // const eid = parseInt(req.form.fields.emotionId as string);
    const content = req.form.fields.content as string;
    const file = req.form.files;
    const imageFile = (file["image"] as formidable.File)?.newFilename;
    let image = undefined;
    if (imageFile) {
      image = `/uploads/${imageFile}`;
    }
    if (dateString) {
      const { emotion_map_id, id } = await this.logMethodService.updatePastDiary(
        uid,
        content,
        dateString,
        image
      );
      await this.logMethodService.diaryCalendar(uid, emotion_map_id, id);

      res.status(200).json({ message: "You have logged mood today!!!" });
      return;
    }
    const isLoggedMood = await this.logMethodService.isLoggedToday(uid);
    // console.log(isLoggedMood, "printing is logged mood");

    if (isLoggedMood) {
      for (const key in isLoggedMood) {
        if (key === "mood_diary_id" && isLoggedMood[key] !== null) {
          const { emotion_map_id, id } = await this.logMethodService.updateDiary(
            uid,
            content,
            image
          );
          await this.logMethodService.diaryCalendar(uid, emotion_map_id, id);

          res.status(200).json({ message: "You have logged mood today!!!" });
          return;
        }
        if (key === "mood_voice_memo_id" && isLoggedMood[key] !== null) {
          await this.logMethodService.removeVoiceMemo(uid);
          await this.logMethodService.removeLogFromCalendar(uid);
        }
        if (key === "mood_emoticon_id" && isLoggedMood[key] !== null) {
          await this.logMethodService.removeEmoticon(uid);
          await this.logMethodService.removeLogFromCalendar(uid);
        }
      }
    }
    const { emotion_map_id, id } = await this.logMethodService.updateDiary(uid, content, image);
    await this.logMethodService.diaryCalendar(uid, emotion_map_id, id);

    res.status(200).json({ message: "successful upload" });
  };
  createVoiceMemo = async (req: Request, res: Response) => {
    const emotionMap = {
      happy: 1,
      ps: 2,
      neutral: 3,
      sad: 4,
      angry: 5,
    };
    const uid = req.session.user.id as number;
    // const eid = parseInt(req.query.eid as string);
    const file = req.form.files;
    console.log(file);
    const audioFile = (file["audio"] as formidable.File)?.newFilename;
    const audio = `/uploads/${audioFile}`;
    console.log(audioFile, "here is the audio file");
    const base64Audio = await readFile(path.join(__dirname, "..", "public", audio), {
      encoding: "base64",
    });
    console.log(base64Audio);
    const resp = await fetch("http://localhost:8000/emotion/prediction", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ audio: base64Audio }),
    });

    const emotion = await resp.json();
    console.log(emotion, 'hihi')
    const eid = emotionMap[emotion];
    const dateString = req.params.date;
    if (dateString) {
      const { emotion_map_id, id } = await this.logMethodService.updatePastVoiceMemo(
        uid,
        audio,
        eid,
        dateString
      );
      await this.logMethodService.voiceMemoCalender(uid, emotion_map_id, id);

      res.status(200).json({ message: "You have logged mood today!!!", emotion_map_id });
      return;
    }

    const isLoggedMood = await this.logMethodService.isLoggedToday(uid);
    console.log(isLoggedMood, "printing is logged mood");
    if (isLoggedMood) {
      for (const key in isLoggedMood) {
        if (key === "mood_voice_memo_id" && isLoggedMood[key] !== null) {
          const { emotion_map_id, id } = await this.logMethodService.updateVoiceMemo(
            uid,
            audio,
            eid
          );
          console.log('hi')
          await this.logMethodService.voiceMemoCalender(uid, emotion_map_id, id);

          res.status(200).json({ message: "You have logged mood today!!!", emotion_map_id });
          return;
        }
        if (key === "mood_diary_id" && isLoggedMood[key] !== null) {
          await this.logMethodService.removeDiary(uid);
          await this.logMethodService.removeLogFromCalendar(uid);
        }
        if (key === "mood_emoticon_id" && isLoggedMood[key] !== null) {
          await this.logMethodService.removeEmoticon(uid);
          await this.logMethodService.removeLogFromCalendar(uid);
        }
      }
    }
    console.log(eid)
    const { emotion_map_id, id } = await this.logMethodService.voiceMemo(uid, audio, eid);
    await this.logMethodService.voiceMemoCalender(uid, emotion_map_id, id);
    res.status(200).json({ message: "successful upload", emotion_map_id });
  };
  createEmoticon = async (req: Request, res: Response) => {
    const uid = req.session.user.id as number;
    const eid = parseInt(req.body.emotionId);
    const dateString = req.params.date;
    if (dateString) {
      const { emotion_map_id, id } = await this.logMethodService.updatePastEmoticon(
        uid,
        eid,
        dateString
      );
      console.log(emotion_map_id, id);
      await this.logMethodService.updateLogFromCalendar(uid, emotion_map_id, id);

      res.status(200).json({ message: "You have logged mood today!!!" });
      return;
    }
    const isLoggedMood = await this.logMethodService.isLoggedToday(uid);
    console.log(isLoggedMood, "printing is logged mood");
    if (isLoggedMood) {
      for (const key in isLoggedMood) {
        console.log(key, isLoggedMood[key]);
        if (key === "mood_emoticon_id" && isLoggedMood[key] !== null) {
          console.log("into controller update emoticon");
          const { emotion_map_id, id } = await this.logMethodService.updateEmoticon(uid, eid);
          console.log(emotion_map_id, id);
          await this.logMethodService.updateLogFromCalendar(uid, emotion_map_id, id);

          res.status(200).json({ message: "You have logged mood today!!!" });
          return;
        }
        if (key === "mood_diary_id" && isLoggedMood[key] !== null) {
          await this.logMethodService.removeDiary(uid);
          await this.logMethodService.removeLogFromCalendar(uid);
        }
        if (key === "mood_voice_memo_id" && isLoggedMood[key] !== null) {
          await this.logMethodService.removeVoiceMemo(uid);
          await this.logMethodService.removeLogFromCalendar(uid);
        }
      }
      console.log(isLoggedMood);
    }
    // console.log(req.body.emotionId)
    console.log(eid);
    const { emotion_map_id, id } = await this.logMethodService.emoticon(uid, eid);
    console.log(emotion_map_id, id);
    await this.logMethodService.emoticonCalender(uid, emotion_map_id, id);

    // req.session['record'] = {isLoggedToday: true}
    res.status(200).json({ message: "successful upload" });
  };
}
