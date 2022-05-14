const { validateEmail, validatePassword, validateName } = require('../utils/regex');
const usersQuerys = require('../modules/usersQuerys')
const regex = require('../utils/regex');
const tokens = require('../utils/createToken');


const signUpUser = async (req, res) => {
    //securizar query (eliminar caracteres raros)
    console.log("body", req.body, req.body.email);
    const email = req.body.email;
    const password = req.body.password;

    if (validateEmail(email) && validatePassword(password)) {
        try {

            //first check if the user exists
            await usersQuerys.signUpNewUser(email, password)
            res.status(200).send('User created')

        } catch (error) {
            console.log(error)
            res.status(400).send('User was not saved')
        }
    } else {
        res.status(400).send('invalid email or password')
    }

}

const logInUser = async (req, res) => {
    console.log("back", req.body)
    const { email, password } = req.body
    console.log("req", email, password)
    try {
        const user = await usersQuerys.checkSignedUpUser(email, password)
        console.log("*****************")
        console.log("query result", user)

        if (user.length > 0) {
            const token = await tokens.createToken(email)
            res.status(200).cookie("access_token", token)

        } else {
            res.status(400).send("user does not exist");
        }

    } catch (error) {
        console.log("login error", error)
    }

    //securizar query (eliminar caracteres raros)
    //comprobar existencai de usuario y password en base de datos
    //crear JWT
    //devolver cookie

}



const users = {
    signUpUser,
    logInUser,

}



module.exports = users;