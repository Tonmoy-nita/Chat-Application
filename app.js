const express= require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const path = require('path');
const cookieParser = require('cookie-parser');


const app = express();

//dotenv file config kora holo
dotenv.config()

//database config......
mongoose.connect(process.env.MONGO_CONNECTION_STRING )
.then(() => {
    console.log("MongoDB Connected Successfully!");
}).catch((err) => {
    console.log("MongoDB Connection Failed!", err);
})

//request parsers
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//set view engine
app.set("view engine", "ejs");

//set static folder 
app.use(express.static(path.join(__dirname,"public")));

//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET))

//routing setup



//error handling



//run server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
