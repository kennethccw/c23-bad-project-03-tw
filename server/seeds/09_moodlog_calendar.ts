import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  console.log("test2")
  const trx = await knex.transaction();
  try {
    await trx("moodlog_calendar").insert([
      {
        emotion_map_id: 1,
        mood_voice_memo_id: 1, //happy
        motto_id: 1, //happy
        user_id: 1,
        created_at: "2022-12-08T00:00:00.000Z",
        updated_at: "2022-12-08T00:00:00.000Z",
      },
      {
        emotion_map_id: 3,
        mood_voice_memo_id: 2, // neutral
        motto_id: 5, // neutral
        user_id: 2,
        created_at: "2022-12-09T00:00:00.000Z",
        updated_at: "2022-12-09T00:00:00.000Z",
      },
      {
        emotion_map_id: 1,
        mood_emoticon_id: 1, // happy
        motto_id: 2, // happy
        user_id: 3,
        created_at: "2022-12-10T00:00:00.000Z",
        updated_at: "2022-12-10T00:00:00.000Z",
      },
      {
        emotion_map_id: 1,
        mood_diary_id: 1, // happy
        motto_id: 1, // happy
        user_id: 1,
        created_at: "2022-12-10T00:00:00.000Z",
        updated_at: "2022-12-10T00:00:00.000Z",
      },
      {
        emotion_map_id: 1,
        mood_diary_id: 2, // happy
        motto_id: 2, // happy
        user_id: 2,
        created_at: "2022-12-11T00:00:00.000Z",
        updated_at: "2022-12-11T00:00:00.000Z",
      },
      {
        emotion_map_id: 2,
        mood_diary_id: 3, // surprised
        motto_id: 3, // surprised
        user_id: 1,
        created_at: "2022-12-12T00:00:00.000Z",
        updated_at: "2022-12-12T00:00:00.000Z",
      },
      {
        emotion_map_id: 3,
        mood_diary_id: 4, // neutral
        motto_id: 6, // neutral
        user_id: 1,
        created_at: "2022-12-14T00:00:00.000Z",
        updated_at: "2022-12-14T00:00:00.000Z",
      },
      {
        emotion_map_id: 4,
        mood_diary_id: 5, // sad
        motto_id: 8, // sad
        user_id: 1,
        created_at: "2022-12-15T00:00:00.000Z",
        updated_at: "2022-12-15T00:00:00.000Z",
      },
      {
        emotion_map_id: 5,
        mood_diary_id: 6, // angry
        motto_id: 9, // angry
        user_id: 3,
        created_at: "2022-12-16T00:00:00.000Z",
        updated_at: "2022-12-16T00:00:00.000Z",
      },
      {
        emotion_map_id: 2,
        mood_emoticon_id: 2, // surprised
        motto_id: 3, // surprised
        user_id: 2,
        created_at: "2022-12-17T00:00:00.000Z",
        updated_at: "2022-12-17T00:00:00.000Z",
      },
      {
        emotion_map_id: 3,
        mood_emoticon_id: 3, // neutral
        motto_id: 6, // neutral
        user_id: 2,
        created_at: "2022-12-18T00:00:00.000Z",
        updated_at: "2022-12-18T00:00:00.000Z",
      },
      {
        emotion_map_id: 5,
        mood_emoticon_id: 4, // angry
        motto_id: 9, // angry
        user_id: 2,
        created_at: "2022-12-20T00:00:00.000Z",
        updated_at: "2022-12-20T00:00:00.000Z",
      },
      {
        emotion_map_id: 5,
        mood_emoticon_id: 5, // angry
        motto_id: 10, // angry
        user_id: 3,
        created_at: "2022-12-20T00:00:00.000Z",
        updated_at: "2022-12-20T00:00:00.000Z",
      },
      {
        emotion_map_id: 1,
        mood_voice_memo_id: 3, // happy
        motto_id: 2, // happy
        user_id: 3,
        created_at: "2022-12-21T00:00:00.000Z",
        updated_at: "2022-12-21T00:00:00.000Z",
      },
      {
        emotion_map_id: 5,
        mood_emoticon_id: 4, // angry
        motto_id: 9, // angry
        user_id: 2,
        created_at: "2022-12-15T00:00:00.000Z",
        updated_at: "2022-12-15T00:00:00.000Z",
      }
      
    ]);
    await trx.commit();
  } catch (e) {
    console.log("test",e)
    await trx.rollback();
  }
}
