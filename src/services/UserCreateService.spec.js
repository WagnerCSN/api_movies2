const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");

describe("UserCreateService", () => {
    let userRepositoryInMemory = null;
    let userCreateService = null;
    let user = {};
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        userCreateService = new UserCreateService(userRepositoryInMemory);
        user = {
            name: "teste",
            email: "teste@gmail.com",
            password: "123",
        }
    }); 

    it("user should be create", async () => {
        const userCreated = await userCreateService.execute(user);
        expect(userCreated).toHaveProperty("id");
    });

    it("user not should be create with exists email", async () => {
        const user2 = {
            name: "user2",
            email: "teste@gmail.com",
            password: "123",
        }
        await userCreateService.execute(user);
        await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Email not allowed"))
    })

    it("user not should be create with exists name", async () => {
        const user2 = {
            name: "teste",
            email: "user2@gmail.com",
            password: "123",
        }
        await userCreateService.execute(user);
        await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("User already exists!"))
  })
})

