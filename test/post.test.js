const request = require("supertest");
const app = require("../index.js");

describe("testing/posts", () => {
    const post = {
        title: "Title",
        content: "Blah Blah Blah",
        file: "upload/",
        userId: "14542dfsdf12",
    };

    test("Create a post", async () => {
        const res = await request(app).post("/posts").send(post).expect(201);

        const newPost = res.body.post;

        const sendPost = {
            ...post,
            _id: newPost._id,
            createdAt: newPost.createdAt,
            updatedAt: newPost.updatedAt,
        };

        expect(newPost).toEqual(sendPost);
    });
});
