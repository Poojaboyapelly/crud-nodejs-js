require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors'); 
const path= require('path');
const url = "mongodb://localhost:27017";
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: "*",
  };


const test = express()
test.use(cors(corsOptions));
// to redirect frontend
// test.use(express.static(path.join(__dirname, "../React/build")));
// test.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname + "../React/build/index.html"));
// });

mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true,})

const conn=mongoose.connection

conn.on('open',function(){

    console.log('connected to mongodb')

})


test.use(express.json())

const employeeRouter = require('./routers/employees')
test.use('/api/employees',employeeRouter)

// test.use('/api/user',userRoutes)


test.listen(PORT,function() {
 console.log(`Server running at ${process.env.PORT}`)
})
