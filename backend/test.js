require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors'); 
const path= require('path');
const url = process.env.MONGODB_URL;
const PORT = process.env.PORT || 4000;

const corsOptions = {
    origin: "*",
  };


const test = express()
// to redirect frontend
test.use(express.static(path.join(__dirname, "../React/build")));
test.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "../React/build/index.html"));
});
test.use(cors(corsOptions));

mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true,})

const conn=mongoose.connection

conn.on('open',function(){

    console.log('connected to mongodb')

})


test.use(express.json())

const employeeRouter = require('./routers/employees')
test.use('/api/employees',employeeRouter)

// test.use('/api/user',userRoutes)


test.listen(PORT,'0.0.0.0',function() {
 console.log(`Server running at ${process.env.PORT}`)
})
