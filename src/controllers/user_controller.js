const { hash } = require("crypto");
const {User} = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "secret"

const createUser = async (name, username, email, password, role) => {
    // Si es un superadmin, verificar si ya existe uno
    if (role === "superadmin") {
        const existingSuperadmin = await User.findOne({ where: { role: "superadmin" } });
        if (existingSuperadmin) {
            throw new Error("Superadmin already exists");
        }
    }

    // Hashear la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = await User.create({
        name,
        username,
        email,
        password: hashedPassword,
        role,
        approved: role === "superadmin" ? true : false, // Superadmin se aprueba automáticamente
    });

    return newUser;
};

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
// const approveUser = async (id,  approverId) => {
    
//     const user = await User.findByPk(id);
//     if (!user) throw new Error("User not found");

  
//     const approver = await User.findByPk(approverId);
//     if (!approver) throw new Error("Approver not found");

    
//     if (user.role === "admin" && approver.role !== "superadmin") {
//         throw new Error("Only superadmin can approve admins");
//     }
//     if (user.role === "employee" && approver.role !== "admin") {
//         throw new Error("Only an admin can approve employees");
//     }

//     if(user.role==="employee" ){
//         user.adminId = approverId;
//          user.approved = true;
//     }
    
//    if(user.role==="admin") {
//         user.approved = true;
//     }
   
//     await user.save();

//     return user;
// };

const approveUser = async (id, approverId) => {
    const user = await User.findByPk(id);
    if (!user) throw new Error("User not found");

    const approver = await User.findByPk(approverId);
    if (!approver) throw new Error("Approver not found");

    if (user.role === "admin" && approver.role !== "superadmin") {
        throw new Error("Only superadmin can approve admins");
    }
    if (user.role === "employee" && approver.role !== "admin") {
        throw new Error("Only an admin can approve employees");
    }

    // Datos que se actualizarán
    let updateData = { approved: true };

    // Si es un empleado, también se le asigna el adminId
    if (user.role === "employee") {
        updateData.adminId = approverId;
    }

    // Actualizar el usuario en la base de datos
    await user.update(updateData);

    return user;
};


module.exports = {
    createUser, 
    getUserByid, 
    getAllUsers,
    deleteUser,
    updateUser,
    loginUser,
    approveUser 
}