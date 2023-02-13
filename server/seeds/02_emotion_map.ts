import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  console.log("emotion map")
  const trx = await knex.transaction();
  try {
    await trx("emotion_map").insert([
      { emotion: "Happy", emoji: "photos/emoji/happy.png" },
      { emotion: "Surprised", emoji: "photos/emoji/surprised.png" },
      { emotion: "Neutral", emoji: "photos/emoji/neutral.png" },
      { emotion: "Sad", emoji: "photos/emoji/sad.png" },
      { emotion: "Angry", emoji: "photos/emoji/angry.png" },
    ]);
    await trx.commit();
  } catch (e) {
    console.log(e)
    await trx.rollback();
  }
}
