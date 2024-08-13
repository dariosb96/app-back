const { error } = require("console");
const {createSell, getSellById,  getSell, deleteSell, updateSell } = require("../controllers/sell_controller");

const getSellsHandler = async (req, res)=>{
    try{
        const sells = await getSell();
        res.status(200).json(sells);
        
    }catch (error){
        res.status(400).json({error: error.message});
    }
    
}
const getSellBy = async (req, res) =>{
    try {
        const {id}= req.params;
        const sell = await getSellById(id)
          res.status(200).json(sell); 
    }catch (error){
        res.status(400).json({error: error.message});
    }
}

const createSellHandler = async (req, res) =>{
    try {
         const {place, products,status, year,  month, day, time } = req.body;
         const newSell = await createSell(
            place, 
            products,
           status,
            year,
            month, 
            day,
            time
             );
         res.status(200).json(newSell);
    }catch{
        res.status(400).json({error: error.message});
        
    }
}

const deleteSellHandler = async (req, res) =>{
    try{
        const {id} = req.params;
         await deleteSell(id);
        res.status(200).json({message: `Sell ${id} removed`});
    }catch{
       console.error('Error creating sell:', error); 
        res.status(400).json({error: error.message});
    }
}

const updateS = async (req, res) =>{
    try{
        const {id} = req.params;
        const newData = req.body;
        const sell = await updateSell(id, newData);
        res.status(200).json({ message: "Sell updated"} );
    }catch {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getSellsHandler,
    createSellHandler,
    deleteSellHandler,
    getSellBy,
    updateS
}