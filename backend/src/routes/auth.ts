import express, {Request, Response} from 'express';
import User from '../models/user';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import verifyToken from '../middleware/auth-middle-ware';

const router = express.Router();

//USER LOGIN ROUTE
router.post('/login', [
   check('email', 'Email is required').isEmail(),
   check('password', 'Password is required!').isLength({
    min: 6
   })    
] 
,async (req: Request, res:Response)=>{
   const errors = validationResult(req);
   //check for any error
   if(!errors.isEmpty()){
    return res.status(400).json({message: errors.array()})
   };
   
   const {email, password} = req.body;

   try {
          //find user to login
          const user = await User.findOne({email});
          if(!user){
             return res.status(400).json({message: 'Invalid credential'})
          }
          
          //check the password is match to stored password in database,
          const isMatch = await bcrypt.compare(password, user.password);
          if(!isMatch){
             return res.status(400).json({message: 'Invalid credential'})//the resoan we use the same error message because we dont want give a clue to the hacker, that is it the password or is it the email which is worng!
          }

          //creating access token
          const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET_KEY as string, {
            expiresIn : '1d'
          });

          res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 86400000
          });

          res.status(200).json({userId: user._id})
   } catch (error) {
     console.log(error);
     res.status(500).json({message: 'Something went worng!'})
   }
});

//Validate token route
router.get('/validate-token', verifyToken, (req: Request, res: Response)=>{
   res.status(200).send({userId: req.userId})
})

//Logout Route
router.post('/logout',(req:Request, res:Response)=>{
  //return empty-token to logout.
  res.cookie('auth_token', '', {
   expires: new Date(0),//Create new-empty-token and expires it at the time of creation, means invalid-token  
  });

  res.send()
})


export default router;