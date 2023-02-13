// database related

import type { Knex } from "knex";
import { User } from "../utils/model";
import { table } from "../utils/table";

export class UserService {
  //@ts-ignore
  constructor(private knex: Knex) { }

loginWithGoogle = async (email : string ) => {
  const trx = await this.knex.transaction();
    try {
      const result = await trx(table.USER)
      .select("id", "username")
      .where ("email", email)
      .first();
      await trx.commit();
      return result;
    } catch (e) {
      await trx.rollback();
      return e;
    }
  };

  register = async (user: User) => {
    const trx = await this.knex.transaction();
    try {
      console.log("user");
      await trx<User>(table.USER).insert(user);
      await trx.commit();
    } catch (e) {
      await trx.rollback();
      return e;
    }
    // console.log("2", this.knex);
    // const trail = await this.knex.raw("select * from users");
    // console.log("test", trail.rows[0]);
  };
  checkLogin = async (username: string) => {
    // find user
    const trx = await this.knex.transaction();
    try {
      // console.log("user");
      const result = await trx<User>(table.USER)
        .select("id", "username", "password")
        .where("username", username)
        .first();
      await trx.commit();
      return result;
    } catch (e) {
      await trx.rollback();
      return e;
    }
  };

  getProfile = async (uid: number) => {
    const trx = await this.knex.transaction();
    try {
      const profileInfo = await trx<User>(table.USER)
        .select("image", "username", "email", "age", "medical_record")
        .where("id", uid)
        .first();
      await trx.commit();
      return profileInfo;
    } catch (e) {
      await trx.rollback();
      return e;
    }
  };
  putUpdateProfile = async (uid: number, user: User) => {
    const trx = await this.knex.transaction();
    try {
      const updateProfile = await trx<User>(table.USER)
        .where("id", uid)
        .update(user)
        .returning(["username", "email", "age", "medical_record"])
        await trx.commit();
        return updateProfile;
    } catch (e) {
      await trx.rollback();
      return e;
    }
  };
}