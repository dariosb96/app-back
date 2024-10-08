const jwt = require("jsonwebtoken");
const {User} = require("../db");
const bcryot = require("bcrypt");

const secret = "secret";

const login = async (req, res) => {
    const {username, password} = req.body;
    try{
        const user = await User.findOne({ where: {username}});
        if(!user) {
            return res.status(404).json({message: "usuario no encontrado"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({message: "Contraseña incorrecta"});
        }

        const token = jwt.sign({id: user.id, isAdmin: user.isAdmin}, secret, {
            expiresIn: "1d",
        } );

        return res.status(200).json({token});

    }catch(error) {
            return res.status(500).json({message: "Error de servidor", error: error.message});
    }
}
module.exports = login;