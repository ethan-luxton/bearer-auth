const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')

const COMPLEXITY = 8

function makeUser(sequelize) {
    console.log('I AM MAKING A USER TABLE HERE')
    const Users = sequelize.define('User', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
    })
    console.log(Users)
    Users.createWithHashed = async (username, password) => {
        password = await bcrypt.hash(password, COMPLEXITY)
        console.log('Creating new user', username, password)
        const user = await Users.create({ username, password })
        console.log(user, 'IDENTIFIER 3')
        return user
    }

    Users.findLoggedIn = async (username, password) => {
        const user = await Users.findOne({ where: { username } })
        if (user == null) {
            return null
        }
        if (await bcrypt.compare(password, user.password)) {
            return user
        }
        return null
    }

    return Users
}

module.exports = { makeUser }
