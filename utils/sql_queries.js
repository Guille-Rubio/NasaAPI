

const signUpUser = `INSERT INTO users(name,email) VALUES ($1,$2)`

const queries = {
    signUpUser
}



module.exports = queries;