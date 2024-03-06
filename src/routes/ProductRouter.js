const {Router} = require("express");
const { getProductsHandler, getItemHandler, create_Product } = require("../handlers/product_handler");

const ProductRouter = Router();

ProductRouter.get("/", getProductsHandler);

ProductRouter.get("/:id", getItemHandler);

ProductRouter.post("/", create_Product);

module.exports.productRouter = ProductRouter;