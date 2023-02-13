import type { Knex } from "knex";

const tableName = "mood_voice_memo";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, (table) => {
    table.increments();
    table.string("audio_path");
    table.integer("emotion_map_id").unsigned();
    table.foreign("emotion_map_id").references("emotion_map.id").onDelete('CASCADE');
    table.integer('user_id').unsigned()
    table.foreign('user_id').references('users.id').onDelete('CASCADE');
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}
