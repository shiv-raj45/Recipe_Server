const express=require('express');
const router=express.Router();
const {v4:uuid4}=require('uuid')

const bcrypt=require('bcrypt');
const { default: axios } = require('axios');
const { default: URL } = require('./utils');


const checkIfUserAlreadyExists = (req, res, next) => {
   const email= req.body.email;
   axios.get(`${URL}/users`).then((response)=>{
       const users=response.data;

             
const foundEmail= users.filter(user=>user.user.email===email)
console.log(foundEmail);
      if(foundEmail.length>0){
          console.log('email in use');
  return   res.json({success:0,message:"email is in use"})
}else{next()}
   })
}
const signup=async(req,res)=>{
   const { firstName, lastName, email, password }=req.body;


   const hashedPassword=await bcrypt.hash(password,10);
const user={firstName,lastName,email,hashedPassword};
console.log(user);
   axios.post(`${URL}/users`,{"id":`${uuid4()}`, "user":user}).then(()=>{
       console.log('insertion successful');
   })


}
const signuproute=router.post('/',checkIfUserAlreadyExists,signup);
module.exports={signuproute}