const jwt = require('jsonwebtoken');
const secret = "your_secret_key"; // Usa una clave segura

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token required' });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.userId = decoded.id; // Extrae el ID del usuario del token
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = verifyToken;
