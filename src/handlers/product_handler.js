
const {createProduct} = require 

const getItemHandler = (req,res) =>{
    const {id} = req.params;
    res.send(`informacion de producto ${id}`)
}

const getProductsHandler = (req, res) =>{
    res.send("Todos los productos")
}

const create_Product = (req,res) =>{
    res.send("Usuario Creado con Exito");
};



module.exports = { create_Product, getProductsHandler, getItemHandler};