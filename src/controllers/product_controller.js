const {Product} = require("../db");

const createProduct = async (name, category, color, description, image, price, stock ) => {
    await Product.create({ name, category,color, description, image, price, stock });
}
const getProductById = async (id) => {
    const product = await Product.findByPk(id);
    return product;
}

const getAllProducts = async (name) =>{
    const products = await Product.findAll();
    if (name){
        const productName = products.filter( product => product.name.includes(name)) ;

      if (productName.length === 0) {
        return "Product not found";
        }
        return productName;
    }

    return products;
}
const deleteProduct = async (id) => {
    const product = await Product.findByPk(id);
    if (!product) {
        throw new Error("Product not found");
    }
    await product.destroy();
    return product;
}

const deleteStock = async (id) =>{
    const product = await Product.findByPk(id);
    if (!product) throw new Error("Product not found");
    if (!product.isAvailable) throw new Error("Product already deleted");
    product.isAvailable = false;
    await product.save();
}
module.exports = {createProduct, getProductById, getAllProducts, deleteProduct, deleteStock};