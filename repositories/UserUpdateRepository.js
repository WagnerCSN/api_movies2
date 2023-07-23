const knex = require('../database/knex');

class UserUpdateRepository{
    async findByUser(id){
        const user = await knex('users').select('*').where('id', id).first();
       
        return user;
    }

    async findByUsers(){
        const userWithEamilExist = await knex('users').select('*');

        return userWithEamilExist;
    }

    async update({name, email, password, id}){
        const userUpdated = await knex('users').where({id}).update({
            name, email, password })

        return userUpdated;
    }
}

module.exports = UserUpdateRepository