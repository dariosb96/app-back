const {Router} = require("express");
const verifyToken = require("../middleware");
const { getAdminStatsHandler, getUserStatsHandler } = require("../handlers/dash_handler");

const DashRouter = Router();

DashRouter.get("/admin", verifyToken, getAdminStatsHandler);
DashRouter.get("/user", verifyToken, getUserStatsHandler)


module.exports.dashRouter = DashRouter;