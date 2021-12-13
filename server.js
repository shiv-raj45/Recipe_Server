const express = require('express');
const cors = require('cors')

const { json } = require('express');
const bodyParser = require('body-parser');
const { getRecipes, postrecipes } = require('./recipes');
const {signuproute} = require('./signup');
const login = require('./login');
const { search } = require('./search.js');
const app = express();

app.use(cors())
app.use(json());
app.use(bodyParser.json({ extended: true }))
app.use('/recipes', getRecipes)
app.use('/recipes', postrecipes)
app.use('/signup',signuproute)
app.use('/login',login)
app.use('/search',search)


app.listen(process.env.PORT||4000, () => {
    console.log(`Everything is happening on http://localhost:4000`);
})