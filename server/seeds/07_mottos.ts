import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  const trx = await knex.transaction();
  try {
    await trx("mottos").insert([
      {
        content: "The more you count your blessings, the more blessings you will have to count.",
        emotion_map_id: "1", // happy
      },
      {
        content:
          "If you look at happiness as a choice, rather than a destination or a result, it will be accessible to you at all times.",
        emotion_map_id: "1", // happy
      },
      {
        content: "Life is full of surprises.",
        emotion_map_id: "2", // surprised
      },
      {
        content: "I hope that for every candle on your cake you get a wonderful surprise.",
        emotion_map_id: "2", // surprised
      },
      {
        content:
          "Self-love is the balance between accepting yourself as you are while knowing you deserve better and then working towards it.",
        emotion_map_id: "3", // neutral
      },
      {
        content: "Everything happened for a reason.",
        emotion_map_id: "3", // neutral
      },
      {
        content: "Life is not a childhood fantasy.",
        emotion_map_id: "4", // sad
      },
      {
        content: "There are differences that really suck but do not let them define you.",
        emotion_map_id: "4", // sad
      },
      {
        content:
          "You are not the anger, you are the awareness behind the anger. Realize this and the anger will no longer control you.",
        emotion_map_id: "5", // angry
      },
      {
        content: "When angry, count ten before you speak; if very angry, a hundred.",
        emotion_map_id: "5", // angry
      },
    ]);
    await trx.commit();
  } catch (e) {
    await trx.rollback();
  }
}
