const {error} = require("console");
const { getAllUsers, getUserByid, createUser, deleteUser, updateUser, loginUser } = require("../controllers/user_controller");

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
        const {name, username, email, password, isAdmin} = req.body;
        const newUser = await createUser(name, username, email, password, isAdmin);
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
    const {username, password} = req.body;

    try {
        const token = await loginUser(username, password);
        console.log(token);
        res.status(200).json({token});
    }catch(error) {
        if(error.message ==="User not found"){
            res.status(404).json({message: error.message});
        }else if (error.message === "Invalid password"){
            res.status(401).json({message: error.message});
        }else{
            res.status(500).json({message: error.message});
            console.log(error)
        }
    }
}

module.exports = {
    getUsers, getUserBy, createUserHandler, deleteUserHandler, updateUserHandler, LoginUserHandler
}