const User =require('../models/user');
const addUser =async(req,res,next)=>{
    try{
        const user =new User(req.body);
        await user.save();
        return res.status(201).send(user);

    }catch(error){
        console.log(error);
        next(
            getErrorMessage({
                message:'Error while adding User. Try again later'
            })
        );

    }
  }

 module.exports=addUser;
  