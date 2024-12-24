const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get('/profile/view', userAuth ,async(req,res) => {
  try{ 
     const user = req.user;
     res.send(user);
} catch(err){
  res.status(400).send("Error :" + err.message);
}   
});

profileRouter.patch('/profile/edit', userAuth , async(req,res) => {
 try{
     if(!validateEditProfileData(req)) {
        throw new Error("invalid Edit request");
     }; 
     const loggedInUser = req.user;

     Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

     await loggedInUser.save();

     res.send(`${loggedInUser.firstName} , your profile update successfully`)
   }
     catch(err){
    res.status(400).send("Error :" + err.message);
  }  
});
module.exports = profileRouter;