const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = require('../config/elephantSQLConfig');

//new Sequelize('sqlite::memory:');

class User extends Model { }

User.init({
  // Model attributes are defined here
  id_user: {
    type:DataTypes.INTEGER,
    primaryKey: true,
    unique : true,
    /* allowNull: false, */
    autoIncrement:true
  },

  email: {
    type: DataTypes.STRING,
    /* unique:true, */
    allowNull: false
  },

  password: {
    type: DataTypes.STRING,
    allowNull:false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User',// We need to choose the model name
  tableName: 'users',
  timestamps: 'false',
});

User.sync(/* { force: true } */);

module.exports = User;

// the defined model is the class itself




