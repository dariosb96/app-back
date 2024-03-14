const { Router } = require('express');
const { getSellsHandler, getSellBy, createSellHandler, updateS, deleteSellHandler } = require('../handlers/sell_handler');
const SellRouter = Router();

// ... tus rutas y configuraciones aquí
SellRouter.get("/", getSellsHandler);
SellRouter.get("/:id",getSellBy);
SellRouter.post("/", createSellHandler);
SellRouter.delete("/:id", deleteSellHandler);
SellRouter.put("/:id", updateS);



module.exports.sellRouter =  SellRouter;