const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    try {
      await knex(tables.verhuuring).delete();

      await knex(tables.gebruiker).delete();

      await knex(tables.gebruiker).insert([
        {
          idGebruiker: 1,
          email: 'user1@example.com',
          voornaam: 'John',
          achternaam: 'Doe',
        },
        {
          idGebruiker: 2,
          email: 'user2@example.com',
          voornaam: 'Jane',
          achternaam: 'Smith',
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  },
};
