const express = require('express');
const router = express.Router();
const jwt=require('jsonwebtoken')
const bcrypt = require("bcrypt");
const { default: axios } = require('axios');
const { default: URL } = require('./utils');
const validateLogin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ error: 'fill the field' });
    }
    axios.get(`${URL}/users`).then((response) => {
        const userInDatabase = response.data;
        const userWithInputEmail = userInDatabase.filter((user) => user.user.email === email);
        if (userWithInputEmail.length === 0) {
            console.log('nosuch user');
            return res.json({ success: 0, error: "No user with that email" })
        } else {
            console.log(userWithInputEmail);
            const passwordmatch =  bcrypt.compareSync(password, userWithInputEmail[0].user.hashedPassword);
            if (!passwordmatch) {
                return res.json({ error: 'Incorrect password' })
            } else {
                next();
            }
        }

    })

};

const doLogin=(req,res)=>{
    const {email}=req.body;
    const jwtToken=jwt.sign(email,`SOME_SECRET_KEY`);
axios.get('http://localhost:5000/users').then((response)=>{
    console.log(response.data);
const user=response.data.filter(person=>person.user.email===email);
console.log({token:jwtToken,userdetails:user});
res.json({token:jwtToken,userdetails:user})

})
}

const login = router.post('/',validateLogin,doLogin)



module.exports = login;