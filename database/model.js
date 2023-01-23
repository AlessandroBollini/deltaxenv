const { Sequelize, Model, DataTypes } = require('sequelize');

/**const sequelize = new Sequelize('envisioningv2', 'bollini', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});*/

const sequelize = new Sequelize('svnqjjoi', 'svnqjjoi', 'V3lTZufwMgeFFELAOYk5hTIYCBCJpS2h', {
    host: 'rogue.db.elephantsql.com',
    dialect: 'postgres'
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

class Users extends Model { }
Users.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    wallet: {
        type: DataTypes.STRING,
        unique:true
    },
    email: {
        type: DataTypes.STRING
    },
    level:{
        type:DataTypes.STRING
    }
}, {
    timestamps: false,
    sequelize
});

(async () => {
    await sequelize.sync({ alter: false });
})();

module.exports.Users = Users;