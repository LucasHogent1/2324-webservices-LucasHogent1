const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.verhuuring).delete();
    await knex(tables.verhuuring).insert([
      {
        idVerhuuring: 1,
        idGebruiker: 1,
        idTerrein: 1,
        begin: '2023-01-01 16:00:00',
        duurInUur: '2',

      },
      {
        idVerhuuring: 2,
        idGebruiker: 1,
        idTerrein: 1,
        begin: '2023-01-02 16:00:00',
        duurInUur: '2',

      },
    ]);
  },
};
 