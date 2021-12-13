const { default: axios } = require('axios');
const express=require('express');
const router=express.Router();
const search=router.post('/',(req,res)=>{
    const {keyword}=req.body;

axios.get(`${URL}/recipes`).then((response)=>{
const allRecipes=response.data; //fetch all data from db.json then send data to frontend based on keyword
const searchRecipes=allRecipes.filter(recipe=>recipe.recipe.dishname.includes(keyword));
res.send(searchRecipes)
})
});


module.exports={search}