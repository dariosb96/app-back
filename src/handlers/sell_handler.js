const { error } = require("console");
const { createSell, getSellById, getSellByDate } = require("../controllers/deliver_controller");

const getSellsHandler = (req, res)=>{
    const {id} = req.params;
    if(id) res.send(`Venta id: ${id}`);
    else res.send("todas las ventas");
}

const createSellHandler = async (req, res) =>{
    try {
         const {place, products,total } = req.body;
         const newSell = await createSell(place, products, total);
         res.status(200).json(newSell);
    }catch{
        res.status(400).json({error: error.message});
    }
}
const deleteSellHandler = async (req, req) =>{
    try{
        const {id} = req.params;
        const sell = await db.Sell.findByPk(id);
        if(!sell){
            return res.status(404).json({error: "Venta no encontrada"});
        }
        await sell.destroy();
        res.status(200).json({message: "Venta eliminada!!!"});
    }catch{
        console.error(error.message);
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getSellsHandler,
    createSellHandler,
}