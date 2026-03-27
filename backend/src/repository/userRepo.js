const User = require("../models/usermodel.js")
exports.getUserById = async(id)=>{
    return await User.findById(id)
}
exports.updateUser = async(user)=>{
    return await user.save()
}
exports.saveUser  = async(user)=>{
    return await user.save()
}
exports.findUserByEmail= async(email)=>{
    return await  User.findOne({email});
}


exports.createUser = async(data)=>{
    await User.create(data);
}
exports.updateUserToken = async (userId, token) => {
  return await User.updateOne({ _id: userId }, { token });
};
exports.findUserByName = async(userName) =>{
    return await User.findOne({userName})
};