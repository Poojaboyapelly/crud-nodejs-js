// require('dotenv').config();
// const express = require('express')
// const mongoose = require('mongoose')
// const cors = require('cors'); 
// const path= require('path');
// const url = process.env.MONGODB_URL||"mongodb+srv://poojaboyapelly:<MSDhoni@7>@cluster0.rymqmcp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const PORT = process.env.PORT || 3000;

// const corsOptions = {
//     origin: "*",
//   };


// const test = express()
// test.use(cors(corsOptions));

// mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true,})

// const conn=mongoose.connection

// conn.on('open',function(){

//     console.log('connected to mongodb')

// })


// test.use(express.json())

// const employeeRouter = require('./routers/employees')
// test.use('/api/employees',employeeRouter)

// // test.use('/api/user',userRoutes)


// test.listen(PORT,function() {
//  console.log(`Server running at ${process.env.PORT}`)
// })

const express = require('express');
const connectDB = require('./db'); // Import the MongoDB connection
const employeeRouter = require('./routers/employees');

const app = express();
app.use(express.json());
// Middleware to check database connection
app.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).send('Service Unavailable');
  }
  next();
});
// Connect to MongoDB
connectDB();

// Use employee router
app.use('/api/employees', employeeRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

