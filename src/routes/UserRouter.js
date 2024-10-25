const{Router} = require("express");
const { getUsers, getUserBy, createUserHandler, deleteUserHandler, updateUserHandler, LoginUserHandler } = require("../handlers/users_handler");
const verifyToken = require("../middleware");
// const verifyToken  = require("../middleware");
const UserRouter = Router();

UserRouter.post("/",  createUserHandler);
UserRouter.get("/",  getUsers);
UserRouter.get("/:id", verifyToken, getUserBy);
UserRouter.delete("/:id",verifyToken,  deleteUserHandler);
UserRouter.put("/:id", verifyToken, updateUserHandler);
UserRouter.post("/login", LoginUserHandler);


module.exports.userRouter = UserRouter;