

const {createProduct, getProductById, getAllProducts} = require("../controllers/product_controller")

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
        res.status(400).json({ error: error.message}); 
   }
};
  
const getItemHandler = async (req,res) =>{ 
  const {id} = req.params;
  const Product = await getProductById(id);
 res.send(`informacion de producto ${id}`);
}

module.exports = { create_Product,
  getProductsHandler, 
  getItemHandler};