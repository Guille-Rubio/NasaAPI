const User = require('../models/users');


const signUpNewUser = async (email, password) => {
    console.log("*** EN MODELO ***", email, password);

    try {
        const newUser = await User.create({ email: email, password: password } /* , { fields: ['user', 'password'] } */)
        console.log(newUser , ' was saved to the database!');
    } catch (error) {
        console.log(error)
    }
}


/* const findUser = await User.findAll(); */

const checkSignedUpUser = async (email, password) => {
    try {
        console.log("userQuery", email, password);
        const user = await User.findAll({
            where: {
                email: email,
                password: password
            }
        });
    } catch (error) {
        console.log(error)
    }
}


const usersQuerys = {
    signUpNewUser,
    checkSignedUpUser

}


module.exports = usersQuerys