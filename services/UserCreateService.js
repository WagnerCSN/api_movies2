const { hash } = require('bcryptjs');
const AppError = require('../utils/AppError');

class UserCreateService{
    constructor(userRepository){
        this.userRepository = userRepository;
    }
    async execute({name, email, password}){
        const hashedpassword = await hash(password, 8);
        
        const checkUserExist = await this.userRepository.findByName(name);
        const checkEmailExist = await this.userRepository.findByEmail(email);
       
        if(checkUserExist){
            throw new AppError("User already exists!")
        }

        if(checkEmailExist){
            throw new AppError("Email not allowed")
        }

        const userCreated = await this.userRepository.create({name, email, password: hashedpassword})

        return userCreated;
    }
}

module.exports = UserCreateService;