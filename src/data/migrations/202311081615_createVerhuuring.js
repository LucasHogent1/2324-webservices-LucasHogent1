const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.verhuuring, (table) => {
      table.increments('idVerhuuring');
      table.integer('idGebruiker').notNullable().unsigned();
      table.integer('idTerrein').notNullable().unsigned();
      table.timestamp('begin').notNullable();
      table.integer('duurInUur').notNullable().unsigned();


      table
        .foreign('idGebruiker')
        .references(`${tables.gebruiker}.idGebruiker`)
        .onDelete('CASCADE');

      table
        .foreign('idTerrein')
        .references(`${tables.terrein}.idTerrein`)
        .onDelete('CASCADE');
    });
  },
  down: async (knex) => {
    await knex.schema.dropTableIfExists(tables.verhuuring);
  },
}; 
   