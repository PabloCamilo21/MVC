import jwt from 'jsonwebtoken';

const verificarToken = (req, res, next) => {
    const authHeader = req.header('authorization');

    if (!authHeader)
        return res.status(401).json({msg: "Acesso negado. Token não fornecido"});
    
    const partes = authHeader.split(' ');

    console.log(partes);

    const token = authHeader.split(' ')[1];

    if (!token)
        return res.status(401).json({msg: "Acesso negado. Token não fornecido"});
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified;

        next();
    } catch (err) {
        console.log(err)
        res.status(400).json({msg: "Token Inválido. "});
    }
}
export default verificarToken;