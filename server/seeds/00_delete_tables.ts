import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  console.log("drop")
  // Deletes ALL existing entries
  const tables = [
    "moodlog_calendar",
    "activities",
    "mottos",
    "mood_diary",
    "mood_voice_memo",
    "mood_emoticon",
    "linked_contact",
    "emotion_map",
    "users",
  ];
  const trx = await knex.transaction();

  try {

    for (const table of tables) {
      
      await trx(table).del();
    }

    await trx.commit();
  } catch (e) {
    console.log(e)
    await trx.rollback();
  }
}
