const { Router } = require('express');
const { getSellsHandler, getSellBy, createSellHandler, updateS, deleteSellHandler, completeSellHandler } = require('../handlers/sell_handler');
const verifyToken = require('../middleware');
const SellRouter = Router();


SellRouter.get("/", verifyToken, getSellsHandler);
SellRouter.get("/:id",verifyToken, getSellBy);
SellRouter.post("/",verifyToken,  createSellHandler);
SellRouter.delete("/:id",verifyToken,  deleteSellHandler);
SellRouter.put("/:id", verifyToken, updateS);
SellRouter.put("/:id/complete", completeSellHandler)


module.exports.sellRouter =  SellRouter;