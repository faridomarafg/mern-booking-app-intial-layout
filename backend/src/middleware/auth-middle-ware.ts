import {NextFunction, Request, Response} from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// adding userId-property to the express-type in the expressName-space
declare global{
    namespace Express {
        interface Request {
            userId: string
        }
    }
}

const verifyToken = (req:Request, res: Response, next: NextFunction)=>{
    const token = req.cookies['auth_token'];

    if(!token){
        return res.status(401).json({message:'Unauthorized!'})
    }

    try {
        //decode the token
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

        //GET USER ID FROM TOKEN
        req.userId = (decode as JwtPayload).userId;
        next();
    } catch (error) {
        return res.status(401).json({message:'Unauthorized!'}) 
    }
};

export default verifyToken;