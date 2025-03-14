const { Router } = require("express");
require("dotenv").config();
const { productRouter }  = require("./ProductRouter");
const { sellRouter }  = require("./SellRouter");
const { userRouter } = require("./UserRouter");
const { dashRouter } = require("./DashRouter");

const router = Router();

router.use("/products", productRouter); 
router.use("/sells", sellRouter);
router.use("/users", userRouter);
router.use("/dashboard", dashRouter);



module.exports = router;
