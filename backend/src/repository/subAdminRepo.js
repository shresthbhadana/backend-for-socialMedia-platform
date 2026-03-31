const SubAdmin  =require("../models/subadminModel.js");

exports.createSubAdmin = async(subAdminData)=>{
    await SubAdmin.create(subAdminData);
    
}

exports.getSubAdmin = async(email)=>{
    return await SubAdmin.find({email})
};

exports.deleteSubAdmin = async(id)=>{
    await SubAdmin.findByIdAndDelete(id);
}
exports.getAllSubAdmin = async()=>{
    return await SubAdmin.find();
}