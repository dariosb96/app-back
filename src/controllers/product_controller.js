const {Product} = require("../db");

const createProduct = async (name, category, color, description, image, price, buyprice, stock, userId ) => {
    const  newproduct  = await Product.create({ name, category,color, description, image, price, buyprice, stock, userId });
    return newproduct;
}
const getProductById = async (id) => {
    const product = await Product.findByPk(id);

    if(product){
        return product;
    }
    const userId = id;
    const productsByUser = await Product.findAll({where: {userId}});

    if(productsByUser.length === 0){
        throw new Error("Product not found")
    }

    return productsByUser;
    
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

const updateProduct = async (id, newData) => {
    const product = await Product.findByPk(id);

    if(!product){
        throw new Error("Product not found");
    }

    await product.update(newData);
    return product;
}

const getProductsByCategory = async (category) => {
    try {
        const products = await Product.findAll({where: {category}});
        if (products.length === 0){
            return "no products found in this category";
        }
        return products;
    }catch (error) {
        throw new Error(error.message);
    }
}



module.exports = {createProduct, getProductById, getAllProducts, deleteProduct, deleteStock, updateProduct, getProductsByCategory, };