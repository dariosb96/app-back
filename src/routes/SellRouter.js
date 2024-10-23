const { Router } = require('express');
const { getSellsHandler, getSellBy, createSellHandler, updateS, deleteSellHandler } = require('../handlers/sell_handler');
const verifyToken = require('../middleware');
const SellRouter = Router();

// ... tus rutas y configuraciones aquí
SellRouter.get("/", verifyToken, getSellsHandler);
SellRouter.get("/:id",verifyToken, getSellBy);
SellRouter.post("/",verifyToken,  createSellHandler);
SellRouter.delete("/:id",verifyToken,  deleteSellHandler);
SellRouter.put("/:id", verifyToken, updateS);


module.exports.sellRouter =  SellRouter;