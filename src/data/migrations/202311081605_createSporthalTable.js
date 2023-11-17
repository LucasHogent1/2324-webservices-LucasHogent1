const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.sporthal, (table) => {
      table.increments('idSporthal').primary();
      table.string('straat', 255).notNullable();
      table.integer('nummer').notNullable();
      table.integer('postcode').notNullable();
      table.string('stad', 255).notNullable();
    });
  },
  down: async (knex) => {
    await knex.schema.dropTableIfExists(tables.sporthal);
  },
};
