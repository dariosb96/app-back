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
        const productName = products.filter( product => productRouter.name.includes(name)) ;

      if (productName.length === 0) {
        return "Product not found";
        }
        return productName;
    }

    return products;
}
module.exports = {createProduct, getProductById, getAllProducts};