'use strict';

const { server } = require('../src/server.js');
const supertest = require('supertest');
const { sequelize } = require('../src/models/index.js');
const request = supertest(server);

beforeEach(async () => {await sequelize.sync()});

const createItems = async () => {
    await request.post('/clothes').send({   
        name:'jeans',
        group: 'pants',
    });
    await request.post('/clothes').send({
        name:'sweatshirt',
        group: 'top',
    });
}

describe('RESTful API', () => {

  test('Handles 404 requests', async () => {
    const res = await request.get('/bar');
    expect(res.status).toEqual(404);
  });

  test('Create two items', async () => {
    let res = await request.post('/clothes').send({   
        name:'jeans',
        group: 'pants',
    });
    let resTwo = await request.post('/clothes').send({
        name:'sweatshirt',
        group: 'top',
    });
    expect(res.body.name).toEqual('jeans');
    expect(res.body.group).toEqual('pants');
    expect(resTwo.body.name).toEqual('sweatshirt');
    expect(resTwo.body.group).toEqual('top');
  });

  test('Find all items', async () => {
    await createItems()
    let res = await request.get('/clothes');
    expect(res.body[0].name).toEqual('jeans');
    expect(res.body[0].group).toEqual('pants');
    expect(res.body[1].name).toEqual('sweatshirt');
    expect(res.body[1].group).toEqual('top');
  });

  test('Find one item', async () => {
    await createItems()
    let res = await request.get('/clothes/2');
    expect(res.body.name).toEqual('sweatshirt');
    expect(res.body.group).toEqual('top');
  });

  test('Updates a single clothes item', async () => {
    await createItems()
    await request.put('/clothes/1').send({
        name: "boots",
        group: 'shoes',
    });
    let res = await request.get('/clothes/1');
    expect(res.body.name).toEqual('boots');
    expect(res.body.group).toEqual('shoes');
  });

  test('Deletes a single clothes item', async () => {
    await createItems()
    await request.delete('/clothes/1');
    let res = await request.get('/clothes');
    expect(res.body[0].name).toEqual('sweatshirt');
    expect(res.body[0].group).toEqual('top');
  });
});

afterEach(async () => {await sequelize.drop();});