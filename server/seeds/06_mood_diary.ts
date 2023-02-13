import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  const trx = await knex.transaction();
  try {
    await trx("mood_diary").insert([
      {
        content: "My boyfriend bought a blue iphone to me, it's 14 plus, I'm so happy.",
        image: "../photos/iphone.png",
        emotion_map_id: 1, //happy
        user_id: 1,
        created_at: "2022-12-10T00:00:00.000Z",
        updated_at: "2022-12-10T00:00:00.000Z",
      },
      {
        content: "my cat kiss me, omg! she is so cute, I love her so much!.",
        image: "../photos/cat.png",
        emotion_map_id: 1, //happy
        user_id: 2,
        created_at: "2022-12-11T00:00:00.000Z",
        updated_at: "2022-12-11T00:00:00.000Z",
      },
      {
        content: "I was so surprised to hear my friend quitting her job.",
        emotion_map_id: 2, // surprised
        user_id: 1,
        created_at: "2022-12-12T00:00:00.000Z",
        updated_at: "2022-12-12T00:00:00.000Z",
      },
      {
        content: "I woke up at 8am today, I bought Startbuck before I go to office.",
        image: "../photos/starbuck.png",
        emotion_map_id: 3, //neutral
        user_id: 1,
        created_at: "2022-12-14T00:00:00.000Z",
        updated_at: "2022-12-14T00:00:00.000Z",
      },
      {
        content:
          "I broke up with my girlfriend coz she hold me that I am getting fat recently. Why she can treat me like that! son of bitch! :( .",
        image: "../photos/sonofbitch.png",
        emotion_map_id: 4, //sad
        user_id: 1,
        created_at: "2022-12-15T00:00:00.000Z",
        updated_at: "2022-12-15T00:00:00.000Z",
      },
      {
        content:
          "I am so anrgy today coz my cake was eaten by my sister and It's my afternoon tea!! shit!!.",
        image: "../photos/sonofbitch.png",
        emotion_map_id: 5, //angry
        user_id: 3,
        created_at: "2022-12-16T00:00:00.000Z",
        updated_at: "2022-12-16T00:00:00.000Z",
      },
      
    ]);
    await trx.commit();
  } catch (e) {
    await trx.rollback();
  }
}
