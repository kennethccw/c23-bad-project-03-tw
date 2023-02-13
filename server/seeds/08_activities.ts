import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  const trx = await knex.transaction();
  try {
    await trx("activities").insert([
      {
        description: "The Collective Surreal Memory SURREALHK第二個個人展覽",
        content: "1 to 18 Dec 2022 (except Mon) noon to 7pm (7 hours)",
        image_path: "../photos/activity1.png",
        emotion_map_id: "1",
      },
      {
        description: "The Collective Surreal Memory SURREALHK第二個個人展覽",
        content: "1 to 18 Dec 2022 (except Mon) noon to 7pm (7 hours)",
        image_path: "../photos/activity2.png",
        emotion_map_id: "2",
      },
      {
        description: "韓版teamLab光影展 韓國 ARTE M 沉浸式數碼藝術博物館",
        content: "7 Oct 2022 to 30 Mar 2023 (everyday) 11am to 7pm (8 hours)",
        image_path: "../photos/activity3.png",
        emotion_map_id: "3",
      },
      {
        description: "「尋找足印 ∙ 莫內」沉浸體驗展",
        content: "27 Oct 2022 to 15 Jan 2023 (everyday) 9:30am to 10:30pm (13 hours)",
        image_path: "../photos/activity4.png",
        emotion_map_id: "4",
      },
      {
        description: "KYUBI x Le Petit Prince 小王子 期間限定展覽",
        content: "29 Nov to 28 Dec 2022 (everyday) 11am to 8pm (9 hours)",
        image_path: "../photos/activity5.png",
        emotion_map_id: "5",
      },
      {
        description: "蠟筆小新冬日市集",
        content: "2 Dec 2022 to 2 Jan 2023 (everyday) 11am to 9pm (10 hours)",
        image_path: "../photos/activity6.png",
        emotion_map_id: "1",
      },
      {
        description: "Reality Dropout 門小雷首個香港個展2022",
        content: "4 Nov to 29 Dec 2022 (every Tue to Sat) 11am to 7pm (8 hours)",
        image_path: "../photos/activity7.png",
        emotion_map_id: "2",
      },
      {
        description: "「半邊天；天下無限」藝術展覽",
        content: "16 Nov to 28 Dec 2022 (everyday) 11am to 8pm (9 hours)",
        image_path: "../photos/activity8.png",
        emotion_map_id: "3",
      },
      {
        description: "THE DREAM SHOPS Carrie Illustration首個個人畫展",
        content: "1 Nov to 2 Jan 2023 2022 (everyday) 11am to 8pm (9 hours)",
        image_path: "../photos/activity9.png",
        emotion_map_id: "4",
      },
      {
        description: "「山水築城」攝影及水彩畫聯展",
        content: "2 Jan 2023 2022  (Sat) 5 to 8pm (3 hours)",
        image_path: "../photos/activity10.png",
        emotion_map_id: "5",
      },
    ]);
    await trx.commit();
  } catch (e) {
    await trx.rollback();
  }
}
