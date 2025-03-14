const { Sell, Product, ProductSell } = require("../db");

// Crear una venta con productos asociados
const createSell = async (place, products, status, year, month, day, time, userId) => {
    // Crear la venta
    const newSell = await Sell.create({ place, status, year, month, day, time, userId });

    if (products && products.length > 0) {
        for (const product of products) {
            // Busca el producto desde la base de datos para crear una instancia válida
            const productInstance = await Product.findByPk(product.productId);
            if (!productInstance) {
                throw new Error(`Product with id ${product.productId} not found`);
            }

            // Asocia el producto usando la relación intermedia `through`
            await newSell.addProduct(productInstance, { 
                through: { quantity: product.quantity || 1 } 
            });
        }
    }

    return newSell;
};

// Obtener una venta por ID, incluyendo productos relacionados
const getSellById = async (id) => {
    const sell = await Sell.findByPk(id, {
        include: [{
            model: Product,
            through: {
                attributes: ['quantity'] // Incluir el valor de quantity desde la tabla intermedia
            }
        }]
    });

    if (!sell) {
        throw new Error("Sell not found");
    }

    return sell;
};

// Obtener todas las ventas
const getSell = async () => {
    const sells = await Sell.findAll({
        include: [{ model: Product }] // Incluir productos en cada venta
    });
    return sells;
};

// Eliminar una venta
const deleteSell = async (id) => {
    const sell = await Sell.findByPk(id);
    if (!sell) {
        throw new Error("Sell not found");
    }

    await sell.destroy();
    return sell;
};

// Actualizar una venta
const updateSell = async (id, newData) => {
    const sell = await Sell.findByPk(id, { include: [{ model: Product }] });

    if (!sell) {
        throw new Error("Sell not found");
    }

    if (sell.status === false) {
        throw new Error("Cannot modify a completed sale.");
    }

    await sell.update(newData);
    return sell;
};

// Completar una venta, descontando el stock de los productos
const completeSell = async (id) => {
    const sell = await Sell.findByPk(id, { include: [{ model: Product }] });

    if (!sell) {
        throw new Error("Sell not found");
    }

    if (sell.status === false) {
        throw new Error("Sale is already completed.");
    }

    // Descontar stock de los productos vendidos
    for (const product of sell.Products) { // Sequelize almacena los productos en `Products`
        const productInDB = await Product.findByPk(product.id);
        if (productInDB && productInDB.stock >= product.ProductSell.quantity) {
            productInDB.stock -= product.ProductSell.quantity; // Descontar la cantidad vendida
            await productInDB.save();
        } else {
            throw new Error(`Not enough stock for ${product.name}`);
        }
    }

    // Marcar la venta como completada
    await sell.update({ status: false });
    return sell;
};

module.exports = {
    createSell,
    getSellById,
    getSell,
    deleteSell,
    updateSell,
    completeSell
};
