import express from 'express';
import bcrypt from 'bcrypt';
import { models } from '../DB/connect'
import { UserModel } from '../models/users/userModel';
import { randomBytes } from 'crypto';

const userRouter = express.Router();


const saltRounds = 10;

userRouter.post('/signIn', async (req, res) =>{
  let username = req.body.Username;
  let pass = req.body.Password;

  let currUser = await models.users?.findOne({username: username}).exec();

  if(currUser){

    bcrypt.compare(pass,currUser.passwordHash,(err, validated)=>{
      if(validated){

        let token = randomBytes(64).toString('hex');

        res.status(200).json({token:token,
                              message:"Success"});
        
      }else{
        res.status(404).json({token:"",
                              message:"Password is incorrect"});
      }
    })
    
  }else{
    res.status(404).json({token:"",
                          message:"User not found"})
  }
})

userRouter.post('/createAccount', (req, res) => {
    try{
        bcrypt.hash(req.body.Password, saltRounds, (err:any,hash:string) => {
          const newUser = new UserModel({'username':req.body.Username,
                                        'passwordHash':hash});
          newUser.save();
        })
        let token = randomBytes(64).toString('hex');

        res.status(200).json({token:token,
                              message:"Success"});
    }catch(error){
        console.error(error);
        res.status(400).send(error.message);
    }

})


export {userRouter};

