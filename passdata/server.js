const express =require('express')
const app=express()
const port=1000

app.use(express.static('htmlfiles'))
app.get('/',(req,res)=>{
    res.status(200).send('<h1>hi</h1>')
})

app.listen(port, () => console.log(`Server has started at port ${port}`));


