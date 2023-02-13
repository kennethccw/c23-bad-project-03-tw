import type { Knex } from "knex";

const tableName = "linked_contact";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments();
    table.string("description");
    table.integer("mobile");
    table.integer("user_id").unsigned(); // not duplicated
    table.foreign("user_id").references("users.id").onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}

