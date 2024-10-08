const { hash } = require("crypto");
const {User} = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "secret"

const createUser = async (name, username,  email,password, isAdmin) =>{
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = await User.create({name, username, email, password: hashedPassword, isAdmin});

    return newUser;
}

const getUserByid = async (id) => {
    const user = await User.findByPk(id);
    return user;
}

const getAllUsers = async () => {
    const users = await User.findAll();
    return users;
}

const deleteUser = async (id) => {
    const user = await User.findByPk(id);
    if(!user){
        throw new Error("user not found");
    }
    await user.destroy();
    return user;
}

const updateUser = async (id, newData) => {
    const user = await User.findByPk(id);
    if(!user){
        throw new Error("user not fonud");
    }
    if (newData.password){
        newData.password = await bcrypt.hash(newData.password, 10);
    }
    await user.update(newData);
    return user;
}
const loginUser = async (username, password) => {
    const user = await User.findOne({where: {username}});
    if(!user) {
        throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        throw new Error("invalid password");
    }
    const token = jwt.sign({id: user.id}, secret, {expiresIn: "1h"});
    return token;

}

module.exports = {
    createUser, getUserByid, getAllUsers,deleteUser,updateUser,loginUser 
}