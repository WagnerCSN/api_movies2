const AppError = require('../utils/AppError');
const UserUpdateService = require('./UserUpdateService')
const UserUpdateRepositoryInMemory = require('../repositories/UserUpdateRepositoryInMemory');

describe("UserUpdateService",() =>{
    let userUpdateRepositoryInMemory = null;
    let userUpdateService = null;
    let user = {};
    beforeEach(()=>{
        userUpdateRepositoryInMemory = new UserUpdateRepositoryInMemory();
        userUpdateService = new UserUpdateService(userUpdateRepositoryInMemory);
    });
        
    it("user should exist", async () => {
        user = {
            id: "1",
            name: "teste",
            email: "teste@gmail.com",
        }
        const userCreated = await userUpdateService.execute(user);
        expect(userCreated).toHaveProperty("id");
    })

    it("password should be correct", async () => {
        user = {
                    id: "1",
                    name: "teste",
                    email: "teste@gmail.com",
                    password:"123",
                    old_password: "1234",
                }

        await expect(userUpdateService.execute(user)).rejects.toEqual(new AppError('Current password is incorrect!'));
    })

    it("old_password should be exist", async () => {
        user = {
                    id: "1",
                    name: "teste",
                    email: "teste@gmail.com",
                    password:"123",
                    // old_password: "1234",
                }

        await expect(userUpdateService.execute(user)).rejects.toEqual(new AppError('Enter current password!'));
    })

    it("email should be use", async () => {
        user = {
                    id: "1",
                    name: "teste",
                    email: "teste2@gmail.com",
                    // password:"123",
                    // old_password: "1234",
                }

        await expect(userUpdateService.execute(user)).rejects.toEqual(new AppError('This email is already in use!'));
    })
})
