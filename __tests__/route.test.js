'use strict';

const supertest = require('supertest');
const { server } = require('../src/server.js');
const jwt = require('jsonwebtoken');
const { sequelize } = require('../src/models/index.js');
const request = supertest(server);
const {signin, authRoutes} = require('../src/auth/routes/index');
const b64 = require('js-base64')
const User = require('../src/auth/models')

const createUser = async () => {
    return await request.post('/signup').send({
      username: 'testuser',
      password: 'testpass',
    });
  };

describe('Auth Routes', () => {

    test('Tests posting to /signup route', async () => {
        const res = await createUser();
        expect(res.status).toBe(201);
    });


    test('returns a web token for a sign in route', async () => {
      // arrange
  
      // act
      const req = {
        header: jest.fn().mockImplementation((header) => {
          if (header === 'Authorization') {
            return 'Basic ' + b64.encode('David:pip1');
          }
          return '';
        }),
      };
      const res = { send: jest.fn() };
      const next = jest.fn();
      await signin(req, res, next);
  
      // assert
      const token = res.send.mock.lastCall;
      console.log(token, "IDENTIFIER 5")
      const [_header, payloadBase64, _signature] = token.split('.');
      const payload = JSON.parse(b64.decode(payloadBase64));
      expect(payload.username).toBe('David');
    });
  });
