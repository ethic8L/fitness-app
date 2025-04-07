import { JsonWebTokenError } from "jsonwebtoken";
import { createError } from "../error";

export const verifyToken = (req, res, next) => {
    try {
        if(!req.headers.authorization){
            return next(createError(401, "You are not authenticated!"));
        }

        const token = req.headers.authorization.split(" ")[1];

        if(!token) return next(createError(401, "You are not authenticated!"));

        const decode = jwt.verify(token, process.env.JWT);
        req.user = decode;
        return next();  
    } catch (err) {
        next(err);
    }
}