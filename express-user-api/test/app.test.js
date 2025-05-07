const request = require("supertest");
const app = require("../../src/app");
const expect = require("chai").expect;

describe("User API", () => {
    // Test pour GET /api/users
    describe("GET /api/users", () => {
        it("should return a list of users", async () => {
            const res = await request(app)
                .get("/api/users")
                .expect("Content-Type", /json/)
                .expect(200);

            expect(res.body).to.be.an("array");
            expect(res.body).to.have.lengthOf(2);
            expect(res.body[0]).to.have.property("name", "Alice");
        });
    });

    // Test pour GET /api/users/:id
    describe("GET /api/users/:id", () => {
        it("should return a user by ID", async () => {
            const res = await request(app)
                .get("/api/users/1")
                .expect("Content-Type", /json/)
                .expect(200);

            expect(res.body).to.have.property("id", 1);
            expect(res.body).to.have.property("name", "Alice");
        });

        it("should return 404 if user not found", async () => {
            await request(app)
                .get("/api/users/999")
                .expect("Content-Type", /json/)
                .expect(404);
        });
    });

    // Test pour POST /api/users
    describe("POST /api/users", () => {
        it("should create a new user", async () => {
            const newUser = {
                name: "Charlie",
                email: "charlie@example.com",
            };

            const res = await request(app)
                .post("/api/users")
                .send(newUser)
                .expect("Content-Type", /json/)
                .expect(201);

            expect(res.body).to.have.property("id");
            expect(res.body).to.have.property("name", "Charlie");
            expect(res.body).to.have.property("email", "charlie@example.com");
        });
    });
});
