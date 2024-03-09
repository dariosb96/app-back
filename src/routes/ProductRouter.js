const {Router} = require("express");
const { getProductsHandler, getItemHandler, create_Product, deleteHandler,stockHandler   } = require("../handlers/product_handler");

const ProductRouter = Router();

ProductRouter.get("/", getProductsHandler);

ProductRouter.get("/:id", getItemHandler);

ProductRouter.post("/", create_Product);
ProductRouter.delete("/:id", deleteHandler);
ProductRouter.delete("/stock/:id", stockHandler);

module.exports.productRouter = ProductRouter;
