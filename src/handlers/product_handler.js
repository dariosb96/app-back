const {createProduct, getProductById, getAllProducts, deleteProduct, deleteStock} = require("../controllers/product_controller")

const getProductsHandler = async (req, res) =>{
     const {name} = req.query;
try {
     if(name ){
          const ProdName = await getAllProducts(name);
          return res.status(200).json(ProdName);
     } else {
          const AllProducts = await getAllProducts();
          return res.status(200).json(AllProducts)
     }
}catch (error) {
     return res.status(400).send({error: error.message})
}
}


const create_Product = async(req,res) =>{
   try{
     const {name, category, color, description, image, price, stock} = req.body;
     const newProduct = await createProduct(name, category, color, description, image, price, stock);
     res.status(201).json(newProduct);
   } catch(error) {
        res.status(400).send({error: error.message}); 
   }
};
  
const getItemHandler = async (req,res) =>{ 

     try {
          const {id} = req.params;
          const product = await getProductById(id);
          if (product) {
               res.status(200).json(product);
             } else {
               res.status(404).json({ mensaje: "Product not found" });
             }
        
     }catch(error) {
          res.status(400).send({error: error.message});
     }
 
}

const deleteHandler = async (req, res) => {
     try {
          const {id} = req.params;
          await deleteProduct(id);
          res.status(200).json({message: `Product removed ${id}`});
     }catch(error) {
          res.status(400).send({error: error.message});
     }
}
const stockHandler = async (req, res) => {
     try {
          const {id} = req.params;
          await deleteStock(id);
          res.status(200).json({message: `Product not available ${id}`});
     }catch(error) {
          res.status(400).send({error: error.message});
     }
}

module.exports = { create_Product,
  getProductsHandler, 
  getItemHandler, deleteHandler, stockHandler};