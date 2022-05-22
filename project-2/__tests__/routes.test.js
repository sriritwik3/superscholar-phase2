const request = require("supertest");
const app = require("../index.js");

describe('Test POST /launches', () => {
    test('id for first created object must be 1 and status should always be 1. It should respond with 201 created status code.', async() => {
        const presentBoards = await request(app)
            .get('/boards')
            //console.log(presentBoards.body.rows);
        const response = await request(app)
            .post('/boards')
            .send({
                title: "Ignore! It's just for testing.",
            })
            .expect(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('stage');
        expect(response.body).toMatchObject({
            // id: (presentBoards.body.rows.length + 1),
            stage: 1,
            title: "Ignore! It's just for testing.",
        });
    });
});

describe('Test PUT /launches/:id', () => {
    test('Response body shpuld match with the desired one. It should respond with 200 status code.', async() => {
        const newBoard = await request(app)
            .post('/boards')
            .send({
                title: "Ignore! It's just for testing.",
            })
            .expect(201);
        expect(newBoard.body).toHaveProperty('id');
        const updatedBoard = await request(app)
            .put(`/boards/${newBoard.body.id}`)
            .send({ stage: 2 })
            .expect(200)
        expect(updatedBoard.body).toHaveProperty('id');
        expect(updatedBoard.body).toHaveProperty('stage');
        expect(updatedBoard.body).toHaveProperty('title');
        expect(updatedBoard.body).toMatchObject({
            id: newBoard.body.id,
            stage: 2,
            title: newBoard.body.title,
        });
    });
    test('Response body shpuld match with the desired one. It should respond with 400 status code as stage is not among 1,2,3.', async() => {
        const newBoard = await request(app)
            .post('/boards')
            .send({
                title: "Ignore! It's just for testing.",
            })
            .expect(201);
        expect(newBoard.body).toHaveProperty('id');
        const updatedBoard = await request(app)
            .put(`/boards/${newBoard.body.id}`)
            .send({ stage: 4 })
            .expect(400);
    });
});

describe('Test a 404', () => {
    test('It should respond with a 404 status code', async() => {
        const response = await request(app)
            .get('/nowhere')
            .expect(404);
    });
});