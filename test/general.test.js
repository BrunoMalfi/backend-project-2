const request = require("supertest");
const app = require("../index.js");
const User = require("../models/User.js");

describe("testing/users", () => {
    const user = {
        name: "Username",
        email: "test@example.com",
        password: "123456",
        role: "user",
        birthday: "1990-01-01",
    };

    test("Create a user", async () => {
        let usersCount = await User.countDocuments({});

        expect(usersCount).toBe(0);

        const resUser = await request(app)
            .post("/users/new")
            .send(user)
            .expect(201);

        usersCount = await User.countDocuments({});

        expect(usersCount).toBe(1);
    });
});
