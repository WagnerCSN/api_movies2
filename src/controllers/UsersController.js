const { hash, compare } = require('bcryptjs');
const knex = require('../database/knex');
const AppError = require('../utils/AppError');
const UserRepository = require('../repositories/UserRepository');
const UserCreateService = require('../services/UserCreateService');
const UserUpdateService = require('../services/UserUpdateService');
const UserUpdateRepository = require('../repositories/UserUpdateRepository')

class UsersController{
    async create(request, response){
        const {name, email, password} = request.body;

        const userRepository = new UserRepository();
        const userCreateService = new UserCreateService(userRepository);
        await userCreateService.execute({name, email, password});
        response.json();
    }

    async update(request, response){
        const { name, email, password, old_password } = request.body;
        const id = request.user.id;

        const userUpdateRepository = new UserUpdateRepository();
        const userUpdateService = new UserUpdateService(userUpdateRepository);
        await userUpdateService.execute({ name, email, password, old_password, id });
        
        

        response.json()
            
    }
}
module.exports = UsersController;