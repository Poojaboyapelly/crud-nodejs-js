const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017'
const PORT = 3000

const test = express()

mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true,})

const conn=mongoose.connection

conn.on('open',function(){

    console.log('connected to mongodb')

})

test.use(express.json())

const employeeRouter = require('./routers/employees')
test.use('/employees',employeeRouter)


test.listen(PORT,function() {
 console.log(`Server running at ${PORT}`)
})
