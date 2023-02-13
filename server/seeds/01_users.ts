import type { Knex } from "knex";
import { hashPassword } from "../utils/hash";

export async function seed(knex: Knex): Promise<void> {
  console.log("users")
  // Inserts seed entries
  const trx = await knex.transaction();
  try {
    await trx("users").insert([
      {
        username: "Evan Peters",
        password: await hashPassword("123456"),
        email: "evanpeters@gmail.com",
        age: 35,
        medical_record: "insomnia",
      },
      {
        username: "Colin Ford",
        password: await hashPassword("123456"),
        email: "colinford@gmail.com",
        age: 26,
        medical_record: "bipolar disorder",
        image: 'surprised.png'
      },
      {
        username: "Dia Nash",
        password: await hashPassword("123456"),
        email: "dianash@gmail.com",
        age: 18,
        medical_record: "bipolar disorder",
      },
      {
        username: 'kayaggliu',
        password: await hashPassword('12345678'),
        email: 'kayaggliu@gmail.com',
        level:'admin',
        age: 18,
        medical_record: 'insomnia',
        image: './photos/cat.png'
        
      },

      {
        username: 'suet',
        password: await hashPassword('12345678'),
        email: 'suet@gmail.com',
        level:'admin',
        age: 20,
        medical_record: 'insomnia',
        image: './photos/logo/admin-png.png'
        
      }

    ]);
    await trx.commit();
  } catch (e) {
    await trx.rollback();
  }
}
