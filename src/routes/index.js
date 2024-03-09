const { Router } = require("express");
require("dotenv").config();

const { productRouter }  = require("./ProductRouter");
const { sellRouter }  = require("./SellRouter");
const { deliverRouter }  = require("./DeliverRouter");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/products", productRouter); 

// router.use("/sells", sellRouter);

router.use("/delivers", deliverRouter);

module.exports = router;
