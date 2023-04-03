import express from 'express';
import bcrypt from 'bcrypt';
import { models } from '../DB/connect'
import { UserModel } from '../models/users/userModel';
const userRouter = express.Router();


const saltRounds = 10;

userRouter.get('/signIn', async (req, res) =>{
  let username = req.body.Username;
  let pass = req.body.Password;

  
  let currUser = await models.users?.findOne({username: username}).exec();


  if(currUser){

    bcrypt.compare(pass,currUser.passwordHash,(err, validated)=>{
      if(validated){
        res.status(200).send("User is authorized");
      }else{
        res.status(200).send("Password is incorrect");
      }

    })
    
  }else{
    res.status(200).send("User cannot be found")
  }

    
})

userRouter.post('/createAccount', (req, res) => {
    try{
        bcrypt.hash(req.body.Password, saltRounds, (err:any,hash:string) => {
          const newUser = new UserModel({'username':req.body.Username,
                                        'passwordHash':hash});
          newUser.save();
          console.log(req.body.Password);
                
        })
        res.status(200).send("success");
    
        
    }catch(error){
        console.error(error);
        res.status(400).send(error.message);
    }

})


export {userRouter};

