const express = require("express");
const authRouter = express.Router();

const User = require("../models/user");
const { validateSignUpData } = require('../utils/validation');
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req,res) => {
  try{
  // validate the data 
     validateSignUpData(req);
     const { firstName,lastName,emailId,password } = req.body;

  //encrypt the data 
      const passwordHash = await bcrypt.hash(password,10);
      console.log(passwordHash);

  // creating the new instance of the user model 
   const user = new User({
       firstName,
       lastName,
       emailId,
       password:passwordHash,
  });
 
    await user.save();
   res.send("user added successfully");
  }
  catch(err){
    res.status(400).send("Error :" + err.message);
  }
});

authRouter.post('/login' , async(req,res) => {  
    try {
        const{ emailId,password } = req.body;

        const user = await User.findOne({emailId: emailId});
         if(!user){
          throw new Error("invalid credentials");
         }    
         
        const isPasswordValid = await user.validatePassword(password); 
        if(isPasswordValid){
        //create a jwt  
          const token =  await user.getJWT();
          // console.log(token); 

          // add the token to the cookie and send it back
          res.cookie("token",token,{
            expires : new Date(Date.now() + 180 * 3600000)
          });
          res.send("Login successfull!!!");
        }
        else{
          throw new Error("invalid credentials")
        } 
     }
    catch(err) {
        res.status(400).send("Error :" + err.message);
      }
});

authRouter.post('/logout',async (req,res) =>{
   res.cookie("token",null , {
    expires : new Date(Date.now()),
   });
   res.send("logout successfully!!!");
});

module.exports = authRouter ;