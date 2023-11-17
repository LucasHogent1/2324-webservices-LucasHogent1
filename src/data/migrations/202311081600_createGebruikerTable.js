const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.gebruiker, (table) => {
      table.increments('idGebruiker').primary();
      table.string('email', 255);
      table.string('voornaam', 255);
      table.string('achternaam', 255);
    });
  },
  down: async (knex) => {
    await knex.schema.dropTableIfExists(tables.gebruiker);
  },
};
