const { hash, compare } = require('bcryptjs');
const AppError = require('../utils/AppError');

class UserUpdateService{
    constructor(userUpdateRepository){
        this.userUpdateRepository = userUpdateRepository;
    }

    async execute({name, email, password, old_password, id}){

        const user = await this.userUpdateRepository.findByUser(id);
       
        if(!user){
            throw new AppError('User not found');
        }

        const userWithEamilExist = await this.userUpdateRepository.findByUsers();
        const result = userWithEamilExist.find(mail => mail.email === email);
        
        if(result && result.id !== user.id){
            throw new AppError('This email is already in use!')
        }
        user.name = name ;
        user.email = email;

        if(password && !old_password){
            throw new AppError('Enter current password!')
        }

        if(password && old_password){
            const checkOldPassword = await compare(old_password, user.password)

            if(!checkOldPassword){
                throw new AppError('Current password is incorrect!')
            }

            user.password = await hash(password, 8)
        }
        
        const updateuser= await this.userUpdateRepository.update({name: user.name, 
            email: user.email, 
            password: user.password, id})

        return updateuser;
    }

}

module.exports = UserUpdateService