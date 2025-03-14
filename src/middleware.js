// primer middleware funcionando excepto create sell

// const jwt = require('jsonwebtoken');
// const secret = "secret"; // Usa una clave segura

// const verifyToken = (req, res, next) => {
//     const token = req.headers['authorization'];
   
//     if (!token) {
//         return res.status(403).json({ message: 'Token required' });
//     }


//     try {
//         const decoded = jwt.verify(token, secret);
//         req.userId = decoded.id; // Extrae el ID del usuario del token
//         next();
//     } catch (error) {
//         console.log(token);
//         return res.status(401).json({ message: 'Invalid token' });
//     }
// };

// module.exports = verifyToken;
   

// middlewares/verifytoken.js
const jwt = require("jsonwebtoken");
const secret = "secret";  // Asegúrate de usar el mismo secret que en tu login

const verifytoken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.userId = decoded.id;  // Guarda el userId en el request
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = verifytoken;
