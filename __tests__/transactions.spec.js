const supertest = require('supertest');
const createServer = require('../src/createServer');
const {getKnex, tables} = require('../src/data');

describe("Transactions", ()=>{
    let server;
    let request;
    let knex;


    const data = {
        transactions: [{
          id: 1,
          user_id: 1,
          place_id: 1,
          amount: 3500,
          date: new Date(2021, 4, 25, 19, 40),
        },
        {
          id: 2,
          user_id: 1,
          place_id: 1,
          amount: -220,
          date: new Date(2021, 4, 8, 20, 0),
        },
        {
          id: 3,
          user_id: 1,
          place_id: 1,
          amount: -74,
          date: new Date(2021, 4, 21, 14, 30),
        }],
        places: [{
          id: 1,
          name: 'Test place',
          rating: 3,
        }],
        users: [{
          id: 1,
          name: 'Test User'
        }]
};

      const dataToDelete = {
        transactions: [1, 2, 3],
        places: [1],
        users: [1]
    };
      
      



    beforeAll(async ()=>{
        server = await createServer();
        request = supertest(server.getApp().callback())
        knex = getKnex();
    })


    afterAll(async()=>{
        await server.stop();
    })

    const url = "/api/transactions";
    describe("GET /api/transactions", ()=> {
        beforeAll(async()=>{
            //testdata laden in de database
            await knex(tables.place).insert(data.places);
            await knex(tables.user).insert(data.users);
            await knex(tables.transaction).insert(data.transactions);
        })

        afterAll(async ()=> {
            //alle testdata verwijder uit de database
            await knex(tables.transaction).whereIn('id', dataToDelete.transactions).delete();
            await knex(tables.place).whereIn('id', dataToDelete.transactions).delete();
            await knex(tables.users).whereIn('id', dataToDelete.transactions).delete();
        })

        it('should return 200 and all transactions', async()=>{
            const response = await request.get(url);
            expect(response.status).toBe(200);
            expect(response.body.items.length).toBe(3);

            // 👇
            expect(response.body.items[1]).toEqual({
              id: 3,
              user: {
                id: 1,
                name: 'Test User',
              },
              place: {
                id: 1,
                name: 'Test place',
              },
              amount: -74,
              date: new Date(2021, 4, 21, 14, 30).toJSON(),
            });
            expect(response.body.items[2]).toEqual({
              id: 1,
              user: {
                id: 1,
                name: 'Test User',
              },
              place: {
                id: 1,
                name: 'Test place',
              },
              amount: 3500,
              date: new Date(2021, 4, 25, 19, 40).toJSON(),
            });
          });
            
            
        })



        describe("GET /api/transactions/:id", ()=> {
            beforeAll(async()=>{
                //testdata laden in de database
                await knex(tables.place).insert(data.places);
                await knex(tables.user).insert(data.users);
                await knex(tables.transaction).insert(data.transactions[2]);
            })
    
            afterAll(async ()=> {
                //alle testdata verwijder uit de database
                await knex(tables.transaction).whereIn('id', dataToDelete.transactions).delete();
                await knex(tables.place).whereIn('id', dataToDelete.transactions).delete();
                await knex(tables.users).whereIn('id', dataToDelete.transactions).delete();
            })
    
            it('should return 200 and the transaction', async()=>{
                const response = await request.get(`${url}/3`);
                expect(response.status).toBe(200);
    
                // 👇
                expect(response.body.items[1]).toEqual({
                  id: 3,
                  user: {
                    id: 1,
                    name: 'Test User',
                  },
                  place: {
                    id: 1,
                    name: 'Test place',
                  },
                  amount: -74,
                  date: new Date(2021, 4, 21, 14, 30).toJSON(),
                });
                expect(response.body.items[2]).toEqual({
                  id: 1,
                  user: {
                    id: 1,
                    name: 'Test User',
                  },
                  place: {
                    id: 1,
                    name: 'Test place',
                  },
                  amount: 3500,
                  date: new Date(2021, 4, 25, 19, 40).toJSON(),
                });
              });
                
                
            })
    })


