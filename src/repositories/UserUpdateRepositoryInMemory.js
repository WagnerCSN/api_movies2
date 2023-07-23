class UserUpdateRepositoryInMemory{
    users = [{
        id: "1",
        name: "teste",
        email: "teste@gmail.com",
        password: "$2a$08$ox5PBJNS.Sd/vfcHOdHJKOWe1rdws89DwKqiLzLQuL02Kp/iWt.Ey"
    }, {
        id: "2",
        name: "teste2",
        email: "teste2@gmail.com",
        password: "$2a$08$ox5PBJNS.Sd/vfcHOdHJKOWe1rdws89DwKqiLzLQuL02Kp/iWt.Ey"
    }];
    
    

    async findByUser(id){
        
        return this.users.find(user => user.id === id)
        
    }

    // async findByEmail(email){
        
    //     return this.users.find(user => user.email === email)
        
    // }

    async findByUsers(){
        return this.users.map(user => user)
        
    }

    async update({name, email, password, id}){

        const user = {
            id: id,
            email: email,
            name: name,
            password: password,
        }
         
        this.users.push(user)
       
        return user;
    }
}
module.exports = UserUpdateRepositoryInMemory;
