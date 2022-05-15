const { sequelize } = require('../models/users');
const User = require('../models/users');


const signUpNewUser = async (email, password) => {
    try {
        const newUser = await User.create({ email: email, password: password } /* , { fields: ['user', 'password'] } */)
        console.log(newUser, ' was saved to the database!');
    } catch (error) {
        console.log(error)
    }
}


const checkSignedUpUser = async (email, password) => {
    try {
        const [results, metadata] = await sequelize.query(`SELECT * FROM users WHERE email='${email}' AND password = '${password}';`)

        
        console.log("*******results*******", results)
        //handle wrong password

        return results

    } catch (error) {
        console.log(error)
    }
}


const usersQuerys = {
    signUpNewUser,
    checkSignedUpUser

}


module.exports = usersQuerys