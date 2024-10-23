const jwt = require('jsonwebtoken');
const secret = "secret"; // Usa una clave segura

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    // const authHeader = req.headers.authorization; // Obtén el encabezado Authorization
    // const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Token required' });
    }


    try {
        const decoded = jwt.verify(token, secret);
        req.userId = decoded.id; // Extrae el ID del usuario del token
        next();
    } catch (error) {
        console.log(token);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = verifyToken;
   