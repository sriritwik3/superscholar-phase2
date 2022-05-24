import request from 'supertest';
import app from '../index.js';
import User from '../models/userSchema.js';
import '../config/database.js';
import '../config/passport.js';

afterAll(async() => {
    await User.findOneAndDelete({ email: 'testemail@email.com' });
})


describe("Test User REGISTER", () => {
    test('On succesful registration, we should get 201 status code and response object ', async() => {
        //await User.findOneAndDelete({ email: 'testemail@email.com' });
        const response = await request(app)
            .post('/users/register')
            .send({ email: "testemail@email.com", password: "testpassword123" })
            .expect(201);
        console.log(response.body);
        expect(response.body).toHaveProperty('success');
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('user');
        expect(response.body.user).toMatchObject({
            email: "testemail@email.com",
        });
        //await User.findOneAndDelete({ email: 'testemail@email.com' });
    })

    test('if same email already exists, it should return 400 status code', async() => {
        const response = await request(app)
            .post('/users/register')
            .send({ email: "testemail@email.com", password: "testpassword123" })
            .expect(400);

        expect(response.body).toMatchObject({
            "err": "user with this email already exists"
        });
    })


})

describe("Test User LOGIN", () => {
    test('On succesful login we will get status code 200 and jwt token in the response.', async() => {
        const payload = { email: "testemail@email.com", password: "testpassword123" };
        const response = await request(app)
            .post('/users/login')
            .send(payload)
            .expect(200);

        expect(response.body).toHaveProperty('success');
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('token');

    })

    test('If entered invalid email, we get 401 status code', async() => {
        const payload = { email: "testemil@email.com", password: "testpassword123" };
        const response = await request(app)
            .post('/users/login')
            .send(payload)
            .expect(401);

        expect(response.body).toMatchObject({
            success: false,
            message: "Could not find the user."
        })
    })

    test('If entered invalid password, we get 401 status code', async() => {
        const payload = { email: "testemail@email.com", password: "testpassword12" };
        const response = await request(app)
            .post('/users/login')
            .send(payload)
            .expect(401);

        expect(response.body).toMatchObject({
            success: false,
            message: "Incorrect password"
        })
    })
})