const {Router} = require("express");
const { getProductsHandler, getItemHandler, create_Product, deleteHandler,stockHandler, updateHandler, getByCategory   } = require("../handlers/product_handler");
const verifyToken = require("../middleware");
const upload = require("../upload"); // Asegúrate de importar tu configuración de multer


const ProductRouter = Router();


ProductRouter.get("/", verifyToken, getProductsHandler);
ProductRouter.get("/:id", verifyToken, getItemHandler);
ProductRouter.post("/", verifyToken, upload.single('image'), create_Product);


ProductRouter.delete("/:id", verifyToken, deleteHandler);
ProductRouter.delete("/stock/:id", verifyToken, stockHandler);
ProductRouter.put("/:id", verifyToken, updateHandler);
ProductRouter.get("/category/:category", verifyToken, getByCategory);

module.exports.productRouter = ProductRouter;
