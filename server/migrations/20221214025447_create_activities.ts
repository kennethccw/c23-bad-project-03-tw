import type { Knex } from "knex";

const tableName = "activities";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments();
    table.string("description");
    table.text("content");
    table.string("image_path");
    // table.integer("user_id").unsigned();
    // table.foreign("user_id").references("users.id");
    table.integer("emotion_map_id").unsigned();
    table.foreign("emotion_map_id").references("emotion_map.id").onDelete('CASCADE');
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}
