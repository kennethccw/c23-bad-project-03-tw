import type { Knex } from "knex";
import { table } from "../utils/table";

export class MoodCalendarService {
  constructor(private knex: Knex) {}

  diary = async (uid: number) => {
    const trx = await this.knex.transaction();
    try {
      const result = await trx(table.MOOD_DIARY)
        .select()
        .innerJoin(
          table.EMOTION_MAP,
          `${table.MOOD_DIARY}.emotion_map_id`,
          `${table.EMOTION_MAP}.id`
        )
        .where("user_id", uid)
        // .first();
      await trx.commit();
      return result;
    } catch (e) {
      await trx.rollback();
      return e;
    }
  };
  voiceMemo = async (uid: number) => {
    const trx = await this.knex.transaction();
    try {
      const result = await trx(table.MOOD_VOICE_MEMO)
        .select()
        .innerJoin(
          table.EMOTION_MAP,
          `${table.MOOD_VOICE_MEMO}.emotion_map_id`,
          `${table.EMOTION_MAP}.id`
        )
        .where("user_id", uid)
        // .first();
      await trx.commit();
      return result;
    } catch (e) {
      await trx.rollback();
      return e;
    }
  };
  emoticon = async (uid: number) => {
    const trx = await this.knex.transaction();
    try {
      const result = await trx(table.MOOD_EMOTICON)
        .select()
        .innerJoin(
          table.EMOTION_MAP,
          `${table.MOOD_EMOTICON}.emotion_map_id`,
          `${table.EMOTION_MAP}.id`
        )
        .where("user_id", uid)
        // .first();
      await trx.commit();
      return result;
    } catch (e) {
      await trx.rollback();
      return e;
    }
  };
  selectedDiary = async (uid: number, dateString: string) => {
    const trx = await this.knex.transaction();
    try {
      const result = await trx(table.MOOD_DIARY)
        .select()
        .innerJoin(
          table.EMOTION_MAP,
          `${table.MOOD_DIARY}.emotion_map_id`,
          `${table.EMOTION_MAP}.id`
        )
        .where("user_id", uid)
        .andWhereRaw(`DATE(created_at)='${dateString}'`)
        // .first();
      await trx.commit();
      return result[0];
    } catch (e) {
      await trx.rollback();
      return e;
    }
  };
  selectedDEmoticon = async (uid: number, dateString: string) => {
    const trx = await this.knex.transaction();
    try {
      const result = await trx(table.MOOD_EMOTICON)
        .select()
        .innerJoin(
          table.EMOTION_MAP,
          `${table.MOOD_EMOTICON}.emotion_map_id`,
          `${table.EMOTION_MAP}.id`
        )
        .where("user_id", uid)
        .andWhereRaw(`DATE(created_at)='${dateString}'`)
        // .first();
      await trx.commit();
      console.log(result[0])
      return result[0];
    } catch (e) {
      console.log(e)
      await trx.rollback();
      return e;
    }
  };
  selectedVoiceMemo = async (uid: number, dateString: string) => {
    const trx = await this.knex.transaction();
    try {
      const result = await trx(table.MOOD_VOICE_MEMO)
        .select()
        .innerJoin(
          table.EMOTION_MAP,
          `${table.MOOD_VOICE_MEMO}.emotion_map_id`,
          `${table.EMOTION_MAP}.id`
        )
        .where("user_id", uid)
        .andWhereRaw(`DATE(created_at)='${dateString}'`)
        // .first();
      await trx.commit();
      return result[0];
    } catch (e) {
      await trx.rollback();
      return e;
    }
  };


  
  getMottos = async (eid: number) => {
    const trx = await this.knex.transaction();
    try {
      const mottos = await trx(table.MOTTOS)
        .select("content")
        .where("emotion_map_id", eid);
      await trx.commit();
      console.log(mottos)
      return mottos;
    } catch (e) {
      console.log(e)
      await trx.rollback();
      return e;
    }
  };
  getAllMottos = async () => {
    const trx = await this.knex.transaction();
    try {
      const mottos = await trx(table.MOTTOS)
      .select("content")
      await trx.commit();
      console.log(mottos)
      return mottos;
    } catch (e) {
      console.log(e)
      await trx.rollback();
      return e;
    }
  };
  }
  


  // calendar = async (uid: number) => {
  //   const trx = await this.knex.transaction();
  //   try {
  //     const result = await trx(table.MOODLOG_CALENDAR).select().where("user_id", uid);
  //     await trx.commit();
  //     return result;
  //   } catch (e) {
  //     await trx.rollback();
  //     return e;
  //   }
  // };

  // diary = async (diaryId: number) => {
  //   const trx = await this.knex.transaction();
  //   try {
  //     const result = await trx(table.MOOD_DIARY)
  //       .select()
  //       .innerJoin(
  //         table.EMOTION_MAP,
  //         `${table.MOOD_DIARY}.emotion_map_id`,
  //         `${table.EMOTION_MAP}.id`
  //       )
  //       .where(`${table.MOOD_DIARY}.id`, diaryId)
  //       .first();
  //     await trx.commit();
  //     return result;
  //   } catch (e) {
  //     await trx.rollback();
  //     return e;
  //   }
  // };
  // voiceMemo = async (voiceMemoId: number) => {
  //   const trx = await this.knex.transaction();
  //   try {
  //     const result = await trx(table.MOOD_VOICE_MEMO)
  //       .select()
  //       .innerJoin(
  //         table.EMOTION_MAP,
  //         `${table.MOOD_VOICE_MEMO}.emotion_map_id`,
  //         `${table.EMOTION_MAP}.id`
  //       )
  //       .where(`${table.MOOD_VOICE_MEMO}.id`, voiceMemoId)
  //       .first();
  //     await trx.commit();
  //     return result;
  //   } catch (e) {
  //     await trx.rollback();
  //     return e;
  //   }
  // };
  // emoticon = async (emoticonId: number) => {
  //   const trx = await this.knex.transaction();
  //   try {
  //     const result = await trx(table.MOOD_EMOTICON)
  //       .select()
  //       .innerJoin(
  //         table.EMOTION_MAP,
  //         `${table.MOOD_EMOTICON}.emotion_map_id`,
  //         `${table.EMOTION_MAP}.id`
  //       )
  //       .where(`${table.MOOD_EMOTICON}.id`, emoticonId)
  //       .first();
  //     await trx.commit();
  //     return result;
  //   } catch (e) {
  //     await trx.rollback();
  //     return e;
  //   }
  // };
// }
