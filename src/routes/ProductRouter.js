const {Router} = require("express");
const { getProductsHandler, getItemHandler, create_Product, deleteHandler,stockHandler, updateHandler, getByCategory   } = require("../handlers/product_handler");
const verifyToken = require("../middleware");

const ProductRouter = Router();

// ProductRouter.get("/", getProductsHandler);
// ProductRouter.get("/:id", getItemHandler);
// ProductRouter.post("/", create_Product);
// ProductRouter.delete("/:id", deleteHandler);
// ProductRouter.delete("/stock/:id", stockHandler);
// ProductRouter.put("/:id", updateHandler);
// ProductRouter.get("/category/:category", getByCategory);

ProductRouter.get("/", verifyToken, getProductsHandler);
ProductRouter.get("/:id", verifyToken, getItemHandler);
ProductRouter.post("/", verifyToken, create_Product);
ProductRouter.delete("/:id", verifyToken, deleteHandler);
ProductRouter.delete("/stock/:id", verifyToken, stockHandler);
ProductRouter.put("/:id", verifyToken, updateHandler);
ProductRouter.get("/category/:category", verifyToken, getByCategory);

module.exports.productRouter = ProductRouter;
