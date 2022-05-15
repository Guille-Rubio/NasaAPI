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
    console.log("***** EN MODELO****");
    const { email, password } = req.body
    console.log("req", email, password)
    try {
        const user = await usersQuerys.checkSignedUpUser(email, password)
        console.log("*****************")
        console.log(user.password)
        user.password ? res.status(400).send("invalid user or password") : "";

        if (password === user[0].password) {
            const token = await tokens.createToken(email)
            console.log(token)
            res.status(200).cookie("access_token", token)

        } else {
            res.status(400).send("Invalid user or password");
        }

    } catch (error) {
        console.log("ERROR", error)
    }

    //securizar query (eliminar caracteres raros)
    //crear JWT
    //devolver cookie

}



const users = {
    signUpUser,
    logInUser,

}



module.exports = users;