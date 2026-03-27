const User = require('../models/usermodel.js');
const userService = require("../services/userServies.js")
 exports.getUser = async(req,res,next)=>{
   try{
    const user = await userService.getUserById(req.params.id)
    
   }catch(error){
    next(error)
   }

   }
    
  exports.updateUser = async(req,res)=>{
    try{
        const user = await userService(req.params.id,req.body);;
        res.status(200).json({message : "user updated",user})
        
    }catch(error){
       next(error)
    }
 }
 exports.followUser = async (req, res, next) => {
  try {
    const myId = req.user.id;
    const targetId = req.params.id;

    await userService.followUser(myId, targetId);

    res.status(200).json({
      message: "User followed successfully",
    });
  } catch (error) {
    next(error);
  }
};


exports.unfollowUser = async (req, res) => {
  const { id } = req.params;
  res.json({ message: `You unfollowed user with id ${id}` });
};

