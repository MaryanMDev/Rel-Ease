const express = require('express')
const app = express()
const dotenv = require('dotenv')

dotenv.config({path: './config/config.env'});


// app.use('/' , (req, res) => {
//     res.send(`hello the server is running on port ${process.env.PORT}`);
// })

app.use('/' , require('./routes/home'));


app.listen(process.env.PORT , (req , res) => {
    console.log(`server running on  ${process.env.PORT}`);
})

