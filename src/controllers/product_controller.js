const {Product} = require("../db");

const createProduct = async (name, category, color, description, image, price, buyprice, stock, userId ) => {
    const  newproduct  = await Product.create({ name, category,color, description, image, price, buyprice, stock, userId });
    return newproduct;
}

//funcionando en deploy
// const getProductById = async (id) => {
//     const product = await Product.findByPk(id);

//     if(product){
//         return product;
//     }
//     const userId = id;
//     const productsByUser = await Product.findAll({where: {userId}});

//     if(productsByUser.length === 0){
//         throw new Error("Product not found")
//     }

//     return productsByUser;
//    }
const getProductById = async (id, userId) => {
    const product = await Product.findOne({
        where: {
            id,
            userId, // Asegúrate de que el producto pertenece al usuario
        },
    });

    if (!product) {
        throw new Error("Product not found");
    }

    return product;
};


// !!!!! primer get funcionando en deploy
// const getAllProducts = async (userId, name) =>{
//     const products = await Product.findAll({where: {userId}});
//     if (name){
//         const productName = products.filter( product => product.name.includes(name)) ;

//       if (productName.length === 0) {
//         return "Product not found";
//         }
//         return productName;
//     }

//     return products;
// }

//segundo get 
const getAllProducts = async (userId, name) => {
    const condition = { userId }; // Asegurarse de que solo busque los productos del usuario

    if (name) {
        condition.name = { [Sequelize.Op.iLike]: `%${name}%` }; // Filtrar por nombre si se proporciona
    }

    const products = await Product.findAll({ where: condition });

    if (products.length === 0) {
        return "No products found";
    }

    return products;
};


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


const getProductsByCategory = async (userId, category) => {
    try {
        // Condición para asegurar que solo se filtren los productos del usuario y la categoría indicada
        const condition = { 
            userId, 
            category 
        };

        // Buscar productos con la condición
        const products = await Product.findAll({ where: condition });

        if (products.length === 0) {
            return "No products found in this category for the logged-in user";
        }

        return products;
    } catch (error) {
        throw new Error(error.message);
    }
};


module.exports = {createProduct, getProductById, getAllProducts, deleteProduct, deleteStock, updateProduct, getProductsByCategory, };