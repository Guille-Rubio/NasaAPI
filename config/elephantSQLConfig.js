require('dotenv').config();
const { Sequelize } = require('sequelize');

const elephant = new Sequelize(
    process.env.POSTGRES_DB, 
    process.env.POSTGRES_USERNAME,
    process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_HOST,
    dialect: process.env.POSTGRES_DIALECT
})

const connectSQL = async () => {
    try {
        await elephant.authenticate();
        console.log('PostgreSQL database connected...');
    } catch (error) {
        console.error('Unable to connect to SQL database:', error);
    }
}



(async()=>await connectSQL())();

module.exports = elephant;