import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  const trx = await knex.transaction();
  try {
    await trx("linked_contact").insert([
      { description: "Father", mobile: 12345678, user_id: 1 },
      { description: "Mother", mobile: 12345678, user_id: 2 },
      { description: "Sister", mobile: 12345678, user_id: 3 },
    ]);
    await trx.commit();
  } catch (e) {
    await trx.rollback();
  }
}
