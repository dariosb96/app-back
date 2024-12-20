const {createProduct, getProductById, getAllProducts, deleteProduct, deleteStock, updateProduct, getProductsByCategory, } = require("../controllers/product_controller")
//primer get funcionando en deploy
// const getProductsHandler = async (req, res) =>{
//      const {name} = req.query;
//      const userId= req.userId
// try {
//      if(name ){
//           const ProdName = await getAllProducts(name);
//           return res.status(200).json(ProdName);
//      } else {
//           const AllProducts = await getAllProducts();
//           return res.status(200).json(AllProducts)
//      }
// }catch (error) {
//      console.log(error);
//      return res.status(400).send({error: error.message})
     
// }
// }

const getProductsHandler = async (req, res) => {
     const { name } = req.query;
     const userId = req.userId; // Obtén el userId del token
 
     try {
         const products = await getAllProducts(userId, name);
         return res.status(200).json(products);
     } catch (error) {
         console.log(error);
         return res.status(400).send({ error: error.message });
     }
 };
 


const create_Product = async(req,res) =>{
   try{
     const {name, category, color, description, image, price, buyprice, stock } = req.body;
     const userId= req.userId;
     const newProduct = await createProduct(name, category, color, description, image, price, buyprice, stock, userId);
     res.status(201).json(newProduct);
   } catch(error) {
   console.log(error)
        res.status(400).send({error: error.message}); 
   }
};
  //primero funcionando en deploy
// const getItemHandler = async (req,res) =>{ 

//      try {
//           const {id} = req.params;
//           const product = await getProductById(id);
//           if (product) {
//                res.status(200).json(product);
//              } else {
//                res.status(404).json({ mensaje: "Product not found" });
//              }
        
//      }catch(error) {
//           res.status(400).send({error: error.message});
//      }
//  }

const getItemHandler = async (req, res) => {
     const { id } = req.params;
     const userId = req.userId;
 
     try {
         const product = await getProductById(id, userId);
         res.status(200).json(product);
     } catch (error) {
         res.status(400).send({ error: error.message });
     }
 };
 

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

const updateHandler = async (req, res) =>{
     try {
          const {id} = req.params;
          const newData = req.body;
          const updatedProduct = await updateProduct(id, newData);

          res.status(200).json({ message: "Product updated successfully", updatedProduct });
          
     }catch (error){
          res.status(400).send({error: error.message});
     }
}


const getByCategory = async ( req, res) => {
     const { category} = req.params;
     const userId = req.userId;
 
     try {
         const products = await getProductsByCategory(userId,category,) ;
         res.status(200).json(products);
     }catch (error){
         res.status(400).json({error: error.message})
     }
 }



module.exports = { create_Product,
  getProductsHandler, 
  getItemHandler, deleteHandler, stockHandler, updateHandler, getByCategory};