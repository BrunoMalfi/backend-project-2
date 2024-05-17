const request = require("supertest");
const app = require("../index.js");
const User = require("../models/User.js");
require("dotenv").config();
const { JWT_SECRET } = process.env;

const jwt = require("jsonwebtoken");
let token;
let userId;

describe("testing/users", () => {
    afterAll(() => {
        return User.deleteMany();
    });

    const user = {
        name: "user",
        email: "gmail@gmail.com",
        password: "123456",
        birthday: "1990-01-01",
    };
    test("Create a user", async () => {
        const res = await request(app)
            .post("/users/new")
            .send(user)
            .expect(201);
        expect(res.body.msg).toBeDefined();
    });
    test("Confirm a user", async () => {
        const emailToken = jwt.sign({ email: user.email }, JWT_SECRET);
        const res = await request(app)
            .get("/users/confirm/" + emailToken)
            .expect(201);
        expect(res.text).toBeDefined();
    });
    test("Login a user", async () => {
        const res = await request(app)
            .post("/users/login")
            .send(user)
            .expect(200);
        token = res.body.token;
    });
    test("Get users", async () => {
        const res = await request(app).get("/users").expect(200);
        expect(res.body).toBeInstanceOf({});
    });
});
