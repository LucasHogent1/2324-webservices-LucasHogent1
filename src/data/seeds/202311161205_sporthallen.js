const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.terrein).delete();
    await knex(tables.sporthal).delete();
    await knex(tables.sporthal).insert([
      {
        idSporthal: 1,
        nummer: '1',
        postcode: '9000',
        stad: 'Gent',
        straat: 'blablastraat',
      },
      {
        idSporthal: 2,
        nummer: '2',
        postcode: '2000',
        stad: 'Antwerpen',
        straat: 'blablastraat',
      },
    ]);
  },
};
