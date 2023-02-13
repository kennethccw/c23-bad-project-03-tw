import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  const trx = await knex.transaction();
  try {
    await trx("mood_emoticon").insert([
      {
        emotion_map_id: 1,
        user_id: 3,
        created_at: "2022-12-10T00:00:00.000Z",
        updated_at: "2022-12-10T00:00:00.000Z",
      },
      {
        emotion_map_id: 2,
        user_id: 2,
        created_at: "2022-12-17T00:00:00.000Z",
        updated_at: "2022-12-17T00:00:00.000Z",
      },
      {
        emotion_map_id: 3,
        user_id: 2,
        created_at: "2022-12-18T00:00:00.000Z",
        updated_at: "2022-12-18T00:00:00.000Z",
      },
      {
        emotion_map_id: 4,
        user_id: 2,
        created_at: "2022-12-20T00:00:00.000Z",
        updated_at: "2022-12-20T00:00:00.000Z",
      },
      {
        emotion_map_id: 5,
        user_id: 3,
        created_at: "2022-12-20T00:00:00.000Z",
        updated_at: "2022-12-20T00:00:00.000Z",
      },

      {
        emotion_map_id: 2,
        user_id: 2,
        created_at: "2022-12-16T00:00:00.000Z",
        updated_at: "2022-12-16T00:00:00.000Z",
      },

      {
        emotion_map_id: 3,
        user_id: 2,
        created_at: "2022-12-15T00:00:00.000Z",
        updated_at: "2022-12-15T00:00:00.000Z",
      },

      {
        emotion_map_id: 3,
        user_id: 2,
        created_at: "2022-12-14T00:00:00.000Z",
        updated_at: "2022-12-14T00:00:00.000Z",
      },

      {
        emotion_map_id: 1,
        user_id: 2,
        created_at: "2022-12-13T00:00:00.000Z",
        updated_at: "2022-12-13T00:00:00.000Z",
      },

      {
        emotion_map_id: 2,
        user_id: 2,
        created_at: "2022-12-12T00:00:00.000Z",
        updated_at: "2022-12-12T00:00:00.000Z",
      },

      {
        emotion_map_id: 3,
        user_id: 2,
        created_at: "2022-12-11T00:00:00.000Z",
        updated_at: "2022-12-11T00:00:00.000Z",
      },


    ]);
    await trx.commit();
  } catch (e) {
    await trx.rollback();
  }
}
