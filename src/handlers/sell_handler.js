const { error } = require("console");
const { createSell, getSellById, getSell, deleteSell, updateSell, completeSell } = require("../controllers/sell_controller");
const {  ProductSell } = require("../db");

// Obtener todas las ventas
const getSellsHandler = async (req, res) => {
    try {
        const sells = await getSell();
        res.status(200).json(sells);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener una venta por ID con productos asociados
const getSellBy = async (req, res) => {
    try {
        const { id } = req.params;
        const sell = await getSellById(id);
        res.status(200).json(sell);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Crear una nueva venta
const createSellHandler = async (req, res) => {
    try {
        const { place, products, status, year, month, day, time } = req.body;
        const userId = req.userId;  // Obtiene el userId del middleware

        const newSell = await createSell(place, products, status, year, month, day, time, userId);

        res.status(200).json(newSell);
    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log("REQ.BODY:", req.body);  
        console.log({ error: error.message });
    }
};

// Eliminar una venta
const deleteSellHandler = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteSell(id);
        res.status(200).json({ message: `Sell ${id} removed` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Actualizar una venta
const updateS = async (req, res) => {
    try {
        const { id } = req.params;
        const newData = req.body;
        const sell = await updateSell(id, newData);
        res.status(200).json({ message: "Sell updated", sell });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Completar una venta
const completeSellHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const sell = await completeSell(id);
        res.status(200).json({ message: "Sell completed", sell });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getSellsHandler,
    createSellHandler,
    deleteSellHandler,
    getSellBy,
    updateS,
    completeSellHandler
};
