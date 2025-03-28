const {error} = require("console");
const {User} = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "secret"
const { getAllUsers, getUserByid, createUser, deleteUser, updateUser, loginUser, approveUser } = require("../controllers/user_controller");

const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);      
    }catch(error){
        res.status(400).json({error: error.message});
    }
};

const getUserBy = async (req, res) => {
    try{
        const {id} = req.params;
        const user = await getUserByid(id);
        res.status(200).json({user});
    }catch(error){
        res.status(400).json({error: error.message});

    }
}

const createUserHandler = async (req, res) => {
    try{
        const {name, username, email, password, role} = req.body;
        const newUser = await createUser(name, username, email, password, role);
        res.status(201).json(newUser);
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const deleteUserHandler = async (req, res) => {
    try{
        const {id} = req.params;
        await deleteUser(id);
        res.status(201).json({message: `User ${id} removed`})
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

const updateUserHandler = async(req,res) => {
    try{
        const {id} = req.params;
        const newData = req.body;
        const updatedUser = await updateUser(id, newData);
        res.status(200).json({message: "User update", updatedUser});
        
    }catch(errpr){
        res.status(400).json({error: error.message});
    }
}

const LoginUserHandler = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Primero, buscamos al usuario
        const user = await User.findOne({ where: { username } });

        // Verificamos si el usuario no existe
        if (!user) {
            throw new Error("User not found");
        }
        
        if(!user.approved)throw new Error("User is not approved");
        
        // Luego, comparamos las contraseñas
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        // Ahora generamos el token después de validar que el usuario existe y la contraseña es correcta
        const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: "1h" });

        // Enviamos la respuesta con el token y los datos del usuario
        res.status(200).json({
            token,
            userdata: {
                id: user.id,
                username: user.username,
                // Puedes agregar más campos si los necesitas
            },
        });
    } catch (error) {
        // Manejo de errores
        if (error.message === "User not found") {
            res.status(404).json({ message: error.message });
        } else if (error.message === "Invalid password") {
            res.status(401).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
            console.log(error);
        }
    }
};




const approveUserHandler = async (req, res) => {
    try {
        const { id } = req.params; // ID del usuario a aprobar
        const { approverId } = req.body; // ID del usuario que aprueba
        
        // Extraer el token del header
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) throw new Error("Token required");

        // Verificar el token
        const decoded = jwt.verify(token, secret);
        if (!decoded) throw new Error("Invalid token");

        // Validar el rol del usuario que aprueba
        if ((decoded.role === "employee") || (decoded.role === "admin" && id !== "employee")) {
            throw new Error("Unauthorized action");
        }
        // Aprobar usuario
        const approvedUser = await approveUser(id, approverId);
        res.status(200).json({ message: `User ${approvedUser.username} approved successfully!`, approvedUser });
    } catch (error) {
        res.status(403).json({ error: error.message });
    }
};





module.exports = {
    getUsers, 
    getUserBy, 
    createUserHandler, 
    deleteUserHandler, 
    updateUserHandler, 
    LoginUserHandler,
    approveUserHandler
}