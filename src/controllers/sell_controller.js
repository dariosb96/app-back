const {Sell} = require("../db");

const createSell = async (place, products,status, year,  month, day, time ) =>{
   const newSell =  await Sell.create({place, products, status, year, month, day, time });
    return newSell;
}

const getSellById = async (id)=>{
    const Sell1 = await Sell.findByPk(id);
    return Sell1;
}
const getSell = async () =>{
    const sells = await Sell.findAll();
    return sells;
}


const deleteSell = async (id)=> {
    const sell = await Sell.findByPk(id);
    if(!sell){
        throw new Error("Sell not found")
    } await sell.destroy();
    return sell;
}

const updateSell = async (id, newData) =>{
    const sell = await Sell.findByPk(id);

    if (!sell){
        throw new Error("Sell not found");
    }
    await sell.update(newData);
    return sell;
}

module.exports = {createSell,
    getSellById, deleteSell,
         getSell, updateSell
}