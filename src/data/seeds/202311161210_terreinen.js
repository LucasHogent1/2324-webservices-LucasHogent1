const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.terrein).delete();
    await knex(tables.terrein).insert([
      {
        idTerrein: 1,
        soort: 'Outdoor',
        bedekt: 'Nee',
        prijs: 25.00,
        idSporthal: 1,
      },
      {
        idTerrein: 2,
        soort: 'Indoor',
        bedekt: 'Ja',
        prijs: 30.00,
        idSporthal: 2,
      },
    ]);
  },
};
