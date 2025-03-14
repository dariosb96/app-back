const { getAdminStats, getUserStats } = require("../controllers/dash_controller");

const getAdminStatsHandler = async (req, res) => {
    try {
        const stats = await getAdminStats();
        return res.status(200).json(stats);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getUserStatsHandler = async (req, res) => {
    try {
        const userId = req.userId;  // Cambié esto de `req.user?.id` a `req.userId`
        console.log("User ID extraído:", userId); 
        if (!userId) {
            return res.status(401).json({ error: "No autorizado. Token inválido o inexistente." });
        }

        const stats = await getUserStats(userId);
        return res.status(200).json(stats);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { getAdminStatsHandler, getUserStatsHandler };
