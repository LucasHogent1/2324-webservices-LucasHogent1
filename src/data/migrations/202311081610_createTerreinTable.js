const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.terrein, (table) => {
      table.increments('idTerrein').primary();
      table.string('soort', 255).notNullable();
      table.string('bedekt', 255).notNullable();
      table.decimal('prijs', 12, 2).notNullable();
      table.integer('idSporthal').notNullable().unsigned();

      table
        .foreign('idSporthal')
        .references(`${tables.sporthal}.idSporthal`)
        .onDelete('CASCADE');
    });
  },
  down: async (knex) => {
    await knex.schema.dropTableIfExists(tables.terrein);
  },
};
