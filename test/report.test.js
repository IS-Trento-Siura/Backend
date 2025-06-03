import request from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';
import User from '../models/UserModel.js';
import Report from '../models/ReportModel.js';
import { mongoConnect, mongoDisconnect } from '../utils/db.js';


let token;
let userId;

describe('Report API', () => {
  beforeAll(async () => {
  await mongoConnect(process.env.MONGO_URL || 'mongodb://localhost:27017/testdb');

    const res = await request(app).post('/api/users').send({
      email: 'report@test.com',
      username: 'reporter',
      password: 'Password1'
    });

    const loginRes = await request(app).post('/api/users/session').send({
      email: 'report@test.com',
      password: 'Password1'
    });

    token = loginRes.headers['set-cookie'][0].split(';')[0].split('=')[1];
    const user = await User.findOne({ email: 'report@test.com' });
    userId = user._id;
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  afterEach(async () => {
    await Report.deleteMany();
  });

  it('should create a report', async () => {
    const res = await request(app)
      .post('/api/reports')
      .set('Cookie', [`token=${token}`])
      .send({
        reportData: {
          titolo: 'Test Report',
          descrizione: 'Description here',
        }
      });
    expect(res.statusCode).toBe(201);
  });

  it('should get all reports (empty)', async () => {
    const res = await request(app).get('/api/reports');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return 404 for non-existing report', async () => {
    const res = await request(app).get('/api/reports/64ac1234nn5678901234567890');
    expect(res.statusCode).toBe(404);
  });
});