import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  console.log("voice memo")
  const trx = await knex.transaction();
  try {
    await trx("mood_voice_memo").insert([
      {
        audio_path: "../audio/OAF_bar_happy.wav",
        emotion_map_id: 1,
        user_id: 1,
        created_at: "2022-12-08T00:00:00.000Z",
        updated_at: "2022-12-08T00:00:00.000Z",
      },
      {
        audio_path: "../audio/OAF_cab_neutral.wav",
        emotion_map_id: 3,
        user_id: 2,
        created_at: "2022-12-09T00:00:00.000Z",
        updated_at: "2022-12-09T00:00:00.000Z",
      },
      {
        audio_path: "../audio/OAF_bar_happy.wav",
        emotion_map_id: 1,
        user_id: 3,
        created_at: "2022-12-21T00:00:00.000Z",
        updated_at: "2022-12-21T00:00:00.000Z",
      },
    ]);
    await trx.commit();
  } catch (e) {
    console.log(e)
    await trx.rollback();
  }
}
