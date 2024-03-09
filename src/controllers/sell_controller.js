const {Sell} = require("../db");

const createSell = async (place, products, total,status) =>{
    await Sell.create({place, products, total,status});
    return Sell;
}

const getSellById = async (id)=>{
    await Sell.findByPk(id);
    return Sell;
}

const getSellByDate = async (date)=>{
    const sells = await Sell.findAll({where:{date:date}});
    return sells;
}

module.exports = {createSell,
    getSellById,
    getSellByDate
}