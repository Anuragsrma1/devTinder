const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName:{
       type:String,
       required:true,
       minLength:4,
       maxLength:100,
    },
    lastName:{ 
         type:String,
    },
    emailId:{
        type:String,
        lowerCase:true,
        required:true,
        unique:true,
        trim:true,
      validate(value){
        if(!validator.isEmail(value)){
        throw new Error("Invalid email address:" + value);
        }
      },
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
            throw new Error("Enter a strong password:" + value);
            }
          },   
    },
    age:{
        type:Number,
        min:18,
    },
   gender:{
    type:String,
    validate(value){
        if(!["male","female","others"].includes(value)){
             throw new Error("Gender data is not valid");              
        }
    },
   },
   photo:{
    type:String,
    default: "https://i.sstatic.net/l60Hf.png",
    validate(value){
        if(!validator.isURL(value)){
        throw new Error("Invalid photoUrl address:" + value);
        }
      },
   },
   about : {
    type:String,
    default : "this is about of a user"
   },
   skills :{
    type :[String],
   }
},
  { 
    timestapms: true ,
  }
);
 
userSchema.methods.getJWT = async function () {
  const user = this;
  
  const token =  await jwt.sign({_id: user._id},"DEV@Tinder$790" , {
      expiresIn: "7d",
    });

    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(
      passwordInputByUser , 
      passwordHash
    ); 
  return isPasswordValid;
}
module.exports = mongoose.model("User",userSchema);;