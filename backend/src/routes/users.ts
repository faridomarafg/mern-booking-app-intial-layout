import express , {Request, Response} from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { check, validationResult, } from "express-validator";

const router = express.Router();


//REGISET USER
router.post('/register', [
    check("firstName", "First name is required").isString(),//this middle-ware check if the body of firstName be empty, and aslo its type should be string.
    check("lastName", "Last name is required").isString(),
    check("email", "Email is required").isEmail (),
    check("password", "Password with 6 or more characters is required").isLength({min: 6})

] , async (req: Request, res: Response)=>{
    //create errors validators for the above middle-ware
    const errors = validationResult(req);
    if(!errors.isEmpty()){// if we have some error for empty-user-registeration fields,
      return res.status(400).json({message: errors.array()})
    }
   try {
    let user = await User.findOne({
      email: req.body.email
    });

    // check for duplicate username or email
    if(user){
        return res.status(400).json({message: 'User already exist!'})
    }

    //if the email is not a duplicate email, then create the user account;
    user = new User(req.body);
    user.save();

    //create token
    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET_KEY as string, {
        expiresIn: '1d'
    });

    //creating response cookie to send to the client.
    res.cookie('auth_token', token, {
        httpOnly: true,
        secure : process.env.NODE_ENV === 'production',
        maxAge: 86400000// means one-day it shoud be same as [ expiresIn: '1d']
    });

    return res.status(200).send({message: 'User registered Ok'})

   } catch (error) {
    console.log(error);// to check the error only in backend, not in client side;
    
    res.status(500).json({message: 'Something went wrong'})
   }
});


export default router