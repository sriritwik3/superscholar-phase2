import request from "supertest";
import app from "../index.js";
import Board from '../models/boardSchema.js';
import User from '../models/userSchema.js';
import '../config/database.js';
import '../config/passport.js';

let testUser1 = {},
    testUser2 = {},
    boardID;

beforeAll(async() => {
    const r1 = await request(app)
        .post('/users/register')
        .send({ email: 'testemail2@email.com', password: 'test123' })
        .expect(201);
    const l1 = await request(app)
        .post('/users/login')
        .send({ email: 'testemail2@email.com', password: 'test123' })
    testUser1.email = r1.body.user.email;
    testUser1.password = 'test123';
    testUser1.token = l1.body.token;
    const r2 = await request(app)
        .post('/users/register')
        .send({ email: 'testemail1@email.com', password: 'test1231' })
        .expect(201);
    const l2 = await request(app)
        .post('/users/login')
        .send({ email: 'testemail1@email.com', password: 'test1231' });
    testUser2.email = r2.body.user.email;
    testUser2.password = 'test1231';
    testUser2.token = l2.body.token;
}, 10000)

afterAll(async() => {
    await User.findOneAndDelete({ email: 'testemail2@email.com' });
    await User.findOneAndDelete({ email: 'testemail1@email.com' });
    await Board.deleteMany({ title: "Ignore! It's just for testing." });
}, 10000)

describe('Test POST /launches', () => {
    test('When the user is logged in,it should respond with 201 status code.', async() => {
        // console.log(testUser1.token);
        const response = await request(app)
            .post('/boards')
            .set(
                'Authorization',
                testUser1.token
                // 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXI5OEBlbWFpbC5jb20iLCJpZCI6IjYyOGJkMmY3OTQzYTlmNTFlNmJiZTA3MyIsImlhdCI6MTY1MzMzMDczNSwiZXhwIjoxNjUzNDE3MTM1fQ.qIMtKgEnzST6hORIwjV3R1Z38Y6AKAjgs3jBB4wsQxI'
            )
            .send({
                title: "Ignore! It's just for testing.",
            })
            .expect(201);
        //console.log(response.body);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('stage');
        boardID = response.body.id;
        expect(response.body).toMatchObject({
            stage: 1,
            title: "Ignore! It's just for testing.",
        });
    });
    test('When the user is not logged in,it should respond with 401 status code.', async() => {
        //console.log(testUser1.token);
        const response = await request(app)
            .post('/boards')
            // .set(
            //   'Authorization',
            //   testUser1.token
            //   // 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXI5OEBlbWFpbC5jb20iLCJpZCI6IjYyOGJkMmY3OTQzYTlmNTFlNmJiZTA3MyIsImlhdCI6MTY1MzMzMDczNSwiZXhwIjoxNjUzNDE3MTM1fQ.qIMtKgEnzST6hORIwjV3R1Z38Y6AKAjgs3jBB4wsQxI'
            // )
            .send({
                title: "Ignore! It's just for testing.",
            })
            .expect(401);
    });
});

describe('Test PUT /launches/:id', () => {
    test('When not loggedin, respond with 401 status code.', async() => {
        const updatedBoard = await request(app)
            .put(`/boards/${boardID}`)
            .send({ stage: 2 })
            .expect(401);
    });
    test('When loggedin but not the author, respond with 403 status code.', async() => {
        const updatedBoard = await request(app)
            .put(`/boards/${boardID}`)
            .set('Authorization', testUser2.token)
            .send({ stage: 2 })
            .expect(403);
    });
    test('When loggedin as the author and stage value lies in [1,3] respond with 200 status code.', async() => {
        const updatedBoard = await request(app)
            .put(`/boards/${boardID}`)
            .set('Authorization', testUser1.token)
            .send({ stage: 2 })
            .expect(200);
        expect(updatedBoard.body).toHaveProperty('stage');
        expect(updatedBoard.body).toHaveProperty('title');
        expect(updatedBoard.body).toMatchObject({
            stage: 2,
            title: "Ignore! It's just for testing.",
        });
    }, 90000)
    test('When loggedin as the author and stage value doesnt lies in [1,3] respond with 400 status code.', async() => {
        const updatedBoard = await request(app)
            .put(`/boards/${boardID}`)
            .set('Authorization', testUser1.token)
            .send({ stage: 4 })
            .expect(400);
    })
})


describe('Test a 404', () => {
    test('It should respond with a 404 status code', async() => {
        const response = await request(app)
            .get('/nowhere')
            .expect(404);
    });
});