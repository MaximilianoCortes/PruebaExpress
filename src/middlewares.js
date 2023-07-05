import { verifyToken } from "./utils/jwt.utils.js";
import UserModel from "./models/user.model.js";


async function checkToken(req, res, next){
    const token = req.headers.authorization || req.headers.Authorization;

    if(!token){
        return res.status(403).send({
            error: 'Se requiere Token'
        });
    }
    const tokenWithoutBearer = token.split('Bearer ')[1]

    try {
        const { id } = verifyToken(tokenWithoutBearer);
        const user = await UserModel.findById(id).exec();
        req.user = user;
        next();
    } catch (error) {
        console.log(req.user)
        return res.status(403).send({
            error: 'Token inválido o expirado',
        });
    }
}

// function isAdmin(role){
//     return function (req, res, next){
//         if(!req.user.isAdmin){
//             return res.status(401).send({
//                 error:'usuario no es admin'
//             });
//         }
//         next();
//     }

// }

export { checkToken,}