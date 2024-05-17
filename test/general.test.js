const request = require("supertest");
const app = require("../index.js");
let token;
let userId;

describe("testing/users", () => {
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
    test("Login a user", async () => {
        const res = await request(app)
            .post("/users/login")
            .send(user)
            .expect(200);
        token = res.body.token;
    });
});
