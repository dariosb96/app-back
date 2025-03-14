const { Sell, Product, User } = require("../db");
const { Op } = require("sequelize");
const { subDays, subMonths, subYears, startOfWeek, startOfMonth, startOfYear } = require("date-fns");

const getAdminStats = async () => {
    try {
        const totalUsers = await User.count();
        const userRegistrations = await User.findAll({
            attributes: ["id", "name", "createdAt"],
        });

        return { totalUsers, userRegistrations };
    } catch (error) {
        throw new Error("Error al obtener estadísticas de administrador: " + error.message);
    }
};

const getUserStats = async (userId) => {
    try {
      // Filtra solo las ventas concretadas (status: true)
      const sales = await Sell.findAll({
        where: { 
          userId,
          status: false // Solo considerar las ventas concretadas
        },
        include: [
          {
            model: Product,
            through: { attributes: ['quantity'] },
          },
        ],
        attributes: ["createdAt"],
      });
  
      // Calcula las ganancias totales y las ganancias por períodos (semana, mes, año) usando la columna quantity
      const totalEarnings = sales.reduce((sum, sale) => {
        return sum + sale.Products.reduce((productSum, product) => {
          return productSum + (product.ProductSell.quantity * product.price); // Usamos quantity y price
        }, 0);
      }, 0);
  
      const weeklyEarnings = sales
        .filter(s => s.createdAt >= startOfWeek(new Date()))
        .reduce((sum, sale) => {
          return sum + sale.Products.reduce((productSum, product) => {
            return productSum + (product.ProductSell.quantity * product.price);
          }, 0);
        }, 0);
  
      const monthlyEarnings = sales
        .filter(s => s.createdAt >= startOfMonth(new Date()))
        .reduce((sum, sale) => {
          return sum + sale.Products.reduce((productSum, product) => {
            return productSum + (product.ProductSell.quantity * product.price);
          }, 0);
        }, 0);
  
      const yearlyEarnings = sales
        .filter(s => s.createdAt >= startOfYear(new Date()))
        .reduce((sum, sale) => {
          return sum + sale.Products.reduce((productSum, product) => {
            return productSum + (product.ProductSell.quantity * product.price);
          }, 0);
        }, 0);
  
      return { totalEarnings, weeklyEarnings, monthlyEarnings, yearlyEarnings };
  
    } catch (error) {
      throw new Error("Error al obtener estadísticas: " + error.message);
    }
  };
  
module.exports = { getAdminStats, getUserStats };
