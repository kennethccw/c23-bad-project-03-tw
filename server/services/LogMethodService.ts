import type { Knex } from "knex";
import { table } from "../utils/table";

export class LogMethodService {
  constructor(private knex: Knex) {}

  diaryEmotion = async (user_id: number, emotion_map_id: number) => {
    const trx = await this.knex.transaction();
    try {
      const eid = await trx(table.MOOD_DIARY)
        .insert({ emotion_map_id, user_id })
        .returning(["emotion_map_id", "id"]);
      await trx.commit();
      console.log(eid[0]);
      return eid[0];
    } catch (e) {
      console.log(e);
      await trx.rollback();
      return e;
    }
  };
  updateDiaryEmotion = async (user_id: number, emotion_map_id: number) => {
    const trx = await this.knex.transaction();
    try {
      const now = new Date();
      const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

      const eid = await trx(table.MOOD_DIARY)
        .update({ emotion_map_id, updated_at: now })
        .whereRaw(`DATE(created_at) = '${today}'`)
        .andWhere("user_id", user_id)
        .returning(["emotion_map_id", "id"]);
      await trx.commit();
      console.log(eid[0]);
      return eid[0];
    } catch (e) {
      console.log(e);
      await trx.rollback();
      return e;
    }
  };
  voiceMemo = async (user_id: number, audio_path: string, emotion_map_id: number) => {
    const trx = await this.knex.transaction();
    try {
      const eid = await trx(table.MOOD_VOICE_MEMO)
        .insert({ audio_path, emotion_map_id, user_id })
        .returning(["emotion_map_id", "id"]);
      await trx.commit();
      console.log(eid[0])
      return eid[0];
    } catch (e) {
      await trx.rollback();
      return e;
    }
  };
  emoticon = async (user_id: number, emotion_map_id: number) => {
    const trx = await this.knex.transaction();
    try {
      const eid = await trx(table.MOOD_EMOTICON)
        .insert({ emotion_map_id, user_id })
        .returning(["emotion_map_id", "id"]);
      console.log(eid);
      await trx.commit();
      return eid[0];
    } catch (e) {
      await trx.rollback();
      return e;
    }
  };
  updateDiary = async (user_id: number, content: string, image?: string) => {
    const trx = await this.knex.transaction();
    try {
      const now = new Date();
      const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
      const eid = await trx(table.MOOD_DIARY)
        .update({ content, image, updated_at: now })
        .whereRaw(`DATE(created_at) = '${today}'`)
        .andWhere("user_id", user_id)
        .returning(["emotion_map_id", "id"]);
      await trx.commit();
      console.log(eid[0]);
      return eid[0];
    } catch (e) {
      console.log(e);
      await trx.rollback();
      return e;
    }
  };
  updatePastDiary = async (
    user_id: number,
    content: string,
    dateString: string,
    image?: string
  ) => {
    const trx = await this.knex.transaction();
    try {
      const now = new Date();
      const eid = await trx(table.MOOD_DIARY)
        .update({ content, image, updated_at: now })
        .whereRaw(`DATE(created_at) = '${dateString}'`)
        .andWhere("user_id", user_id)
        .returning(["emotion_map_id", "id"]);
      await trx.commit();
      console.log(eid[0]);
      return eid[0];
    } catch (e) {
      console.log(e);
      await trx.rollback();
      return e;
    }
  };
  updateVoiceMemo = async (user_id: number, audio_path: string, emotion_map_id: number) => {
    const trx = await this.knex.transaction();
    try {
      const now = new Date();
      const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
      const eid = await trx(table.MOOD_VOICE_MEMO)
        .update({ audio_path, emotion_map_id, updated_at: now })
        .whereRaw(`DATE(created_at) = '${today}'`)
        .andWhere("user_id", user_id)
        .returning(["emotion_map_id", "id"]);
        console.log(eid[0])
      await trx.commit();
      return eid[0];
    } catch (e) {
      await trx.rollback();
      return e;
    }
  };
  updatePastVoiceMemo = async (user_id: number, audio_path: string, emotion_map_id: number, dateString: string) => {
    const trx = await this.knex.transaction();
    try {
      const now = new Date();
      const eid = await trx(table.MOOD_VOICE_MEMO)
        .update({ audio_path, emotion_map_id, updated_at: now })
        .whereRaw(`DATE(created_at) = '${dateString}'`)
        .andWhere("user_id", user_id)
        .returning(["emotion_map_id", "id"]);
      await trx.commit();
      return eid[0];
    } catch (e) {
      await trx.rollback();
      return e;
    }
  };

  updateEmoticon = async (user_id: number, emotion_map_id: number) => {
    const trx = await this.knex.transaction();
    try {
      console.log("into update emoticon");
      const now = new Date();
      const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
      const eid = await trx(table.MOOD_EMOTICON)
        .update({ emotion_map_id, updated_at: now })
        .whereRaw(`DATE(created_at) = '${today}'`)
        .andWhere("user_id", user_id)
        .returning(["emotion_map_id", "id"]);
      await trx.commit();
      return eid[0];
    } catch (e) {
      console.log(e);
      await trx.rollback();
      return e;
    }
  };
  updatePastEmoticon = async (user_id: number, emotion_map_id: number, dateString: string) => {
    const trx = await this.knex.transaction();
    try {
      console.log("into update emoticon");
      const now = new Date()
      const eid = await trx(table.MOOD_EMOTICON)
        .update({ emotion_map_id, updated_at: now })
        .whereRaw(`DATE(created_at) = '${dateString}'`)
        .andWhere("user_id", user_id)
        .returning(["emotion_map_id", "id"]);
      await trx.commit();
      return eid[0];
    } catch (e) {
      console.log(e);
      await trx.rollback();
      return e;
    }
  };
  removeDiary = async (user_id: number) => {
    const trx = await this.knex.transaction();
    try {
      const now = new Date();
      const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
      const eid = await trx(table.MOOD_DIARY)
        .del()
        .whereRaw(`DATE(created_at) = '${today}'`)
        .andWhere("user_id", user_id)
        .returning("emotion_map_id");
      console.log(eid);
      await trx.commit();
      return eid[0]["emotion_map_id"];
    } catch (e) {
      await trx.rollback();
      return e;
    }
  };
  removeEmoticon = async (user_id: number) => {
    const trx = await this.knex.transaction();
    try {
      const now = new Date();
      const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
      const eid = await trx(table.MOOD_EMOTICON)
        .del()
        .whereRaw(`DATE(created_at) = '${today}'`)
        .andWhere("user_id", user_id)
        .returning("emotion_map_id");
      console.log(eid);
      await trx.commit();
      return eid[0]["emotion_map_id"];
    } catch (e) {
      await trx.rollback();
      return e;
    }
  };
  removeVoiceMemo = async (user_id: number) => {
    const trx = await this.knex.transaction();
    try {
      const now = new Date();
      const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
      const eid = await trx(table.MOOD_VOICE_MEMO)
        .del()
        .whereRaw(`DATE(created_at) = '${today}'`)
        .andWhere("user_id", user_id)
        .returning("emotion_map_id");
      console.log(eid);
      await trx.commit();
      return eid[0]["emotion_map_id"];
    } catch (e) {
      await trx.rollback();
      return e;
    }
  };

  diaryCalendar = async (user_id: number, emotion_map_id: number, mood_diary_id: number) => {
    const trx = await this.knex.transaction();
    try {
      console.log("insert into emotion calendar start");
      await trx(table.MOODLOG_CALENDAR).insert({ emotion_map_id, user_id, mood_diary_id });
      await trx.commit();
      console.log("insert into emotion calendar end");
    } catch (e) {
      console.log(e);
      await trx.rollback();
      return e;
    }
  };
  voiceMemoCalender = async (
    user_id: number,
    emotion_map_id: number,
    mood_voice_memo_id: number
  ) => {
    const trx = await this.knex.transaction();
    try {
      console.log("insert into emotion calendar start");
      await trx(table.MOODLOG_CALENDAR).insert({ emotion_map_id, user_id, mood_voice_memo_id });
      await trx.commit();
      console.log("insert into emotion calendar end");
    } catch (e) {
      console.log(e);
      await trx.rollback();
      return e;
    }
  };
  emoticonCalender = async (user_id: number, emotion_map_id: number, mood_emoticon_id: number) => {
    const trx = await this.knex.transaction();
    try {
      console.log("insert into emotion calendar start");
      await trx(table.MOODLOG_CALENDAR).insert({ emotion_map_id, user_id, mood_emoticon_id });
      await trx.commit();
      console.log("insert into emotion calendar end");
    } catch (e) {
      console.log(e);
      await trx.rollback();
      return e;
    }
  };

  isLoggedToday = async (user_id: number) => {
    const now = new Date();
    const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

    console.log(today);

    const trx = await this.knex.transaction();
    try {
      const result = await trx(table.MOODLOG_CALENDAR)
        .select("mood_emoticon_id", "mood_diary_id", "mood_voice_memo_id")
        .whereRaw(`DATE(created_at) = '${today}'`)
        .andWhere("user_id", user_id);
      await trx.commit();
      console.log(result[0]);
      return result[0];
    } catch (e) {
      await trx.rollback();
      return e;
    }
  };

  updateLogFromCalendar = async (
    user_id: number,
    emotion_map_id: number,
    mood_emoticon_id?: number,
    mood_diary_id?: number,
    mood_voice_memo_id?: number
  ) => {
    const now = new Date();
    const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

    console.log(today);

    const trx = await this.knex.transaction();
    try {
      await trx(table.MOODLOG_CALENDAR)
        .update({
          emotion_map_id,
          mood_emoticon_id,
          mood_diary_id,
          mood_voice_memo_id,
          updated_at: now,
        })
        .whereRaw(`DATE(created_at) = '${today}'`)
        .andWhere("user_id", user_id);
      await trx.commit();
    } catch (e) {
      await trx.rollback();
      return e;
    }
  };

  removeLogFromCalendar = async (user_id: number) => {
    const now = new Date();
    const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

    const trx = await this.knex.transaction();
    try {
      await trx(table.MOODLOG_CALENDAR)
        .del()
        .whereRaw(`DATE(created_at) = '${today}'`)
        .andWhere("user_id", user_id);
      await trx.commit();
    } catch (e) {
      await trx.rollback();
      return e;
    }
  };

  updatePastDiaryEmotion = async (user_id: number, emotion_map_id: number, dateString: string) => {
    const now = new Date();
    // console.log(dateString, 'look here')

    const trx = await this.knex.transaction();
    console.log(dateString, "look here");

    try {
      await trx(table.MOOD_DIARY)
        .update({ emotion_map_id, updated_at: now })
        .whereRaw(`DATE(created_at) = '${dateString}'`)
        .andWhere("user_id", user_id);
      await trx.commit();
    } catch (e) {
      console.log(e);
      await trx.rollback();
      return e;
    }
  };
  showPastDiary = async (uid: number, dateString: string) => {
    const trx = await this.knex.transaction();
    try {
      const result = await trx(table.MOOD_DIARY)
        .select()
        .whereRaw(`DATE(created_at) = '${dateString}'`)
        .andWhere("user_id", uid)
        .first();
      await trx.commit();
      return result;
    } catch (e) {
      console.log(e);
      await trx.rollback();
      return e;
    }
  };
  showPastEmoticon = async (uid: number, dateString: string) => {
    const trx = await this.knex.transaction();
    try {
      const result = await trx(table.MOOD_EMOTICON)
        .select()
        .whereRaw(`DATE(created_at) = '${dateString}'`)
        .andWhere("user_id", uid)
        .first();
      await trx.commit();
      return result;
    } catch (e) {
      console.log(e);
      await trx.rollback();
      return e;
    }
  };
}
