const {createProduct, getProductById, getAllProducts, deleteProduct, deleteStock, updateProduct, getProductsByCategory, } = require("../controllers/product_controller")
const upload = require("../upload");

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
 

//create original local y deploy

// const create_Product = async(req,res) =>{
//    try{
//      const {name, category, color, description, image, price, buyprice, stock } = req.body;
//      const userId= req.userId;
//      const newProduct = await createProduct(name, category, color, description, image, price, buyprice, stock, userId);
//      res.status(201).json(newProduct);
//    } catch(error) {
//    console.log(error)
//         res.status(400).send({error: error.message}); 
//    }
// };

const create_Product = async (req, res) => {
     try {
          console.log("Headers:", req.headers);  // Verifica los encabezados
        console.log("Body:", req.body);  // Verifica el cuerpo
        console.log("File:", req.file); 
         const { name, category, color, description, price, buyprice, stock } = req.body;
         const userId = req.userId;
 
         // Si se ha subido una imagen, su URL estará en req.file.location
         const image = req.file ? req.file.location : null;
 
         const newProduct = await createProduct(name, category, color, description, image, price, buyprice, stock, userId);
         res.status(201).json(newProduct);
     } catch (error) {
         console.log(error);
         res.status(400).send({ error: error.message });
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

const updateHandler = [
     // Middleware para subir una imagen
     async (req, res) => {
         try {
             const { id } = req.params;
             const newData = req.body;
             const image = req.file ? req.file.location : null; // URL de la nueva imagen, si se sube
 
             if (image) {
                 newData.image = image;
             }
 
             const updatedProduct = await updateProduct(id, newData);
 
             res.status(200).json({ message: 'Product updated successfully', updatedProduct });
         } catch (error) {
             console.error(error);
             res.status(400).send({ error: error.message });
         }
     },
 ];
 

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