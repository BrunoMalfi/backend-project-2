const request = require("supertest");
const app = require("../index.js");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];
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
    test("Confirm a user", async () => {
        const emailToken = jwt.sign({ email: user.email }, jwt_secret, {
            expiresIn: "48h",
        });
        const res = await request(app)
            .get("/users/confirm/" + emailToken)
            .expect(201);
        expect(res.text).toBe("Usuario confirmado con éxito");
    });

    // test("Login a user", async () => {
    //     const res = await request(app)
    //         .post("/users/login")
    //         .send(user)
    //         .expect(200);
    //     token = res.body.token;
    // });
});
