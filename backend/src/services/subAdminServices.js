const subAdminRepo = require("../repository/subAdminRepo");
const bcrypt  = require("bcryptjs")
const jwt = require("jsonwebtoken");



exports.getSubAdmin = async(email)=>{
    return await subAdminRepo.getSubAdmin(email);}


exports.createSubAdmin = async(subAdminData)=>{
   
    const {name ,email,password} = subAdminData;
    const exists = await subAdminRepo.getSubAdmin(email);
    if(exists){
        throw new Error("sub admin with this email already exists");
    };
    const hash = await bcrypt.hash(password,10);
    return await subAdminRepo.createSubAdmin({
        name,
        email,
        password : hash
    })
}

exports.loginSubAdmin =  async(email,password)=>{
    const subAdmin = await subAdminRepo.getSubAdmin(email);
 if(!subAdmin){
    throw new Error("subAdmin not exisits");

 }
 const isMatch = await bcrypt.compare(password,subAdmin.password);
 if(!isMatch){
    throw new Error("invalid credentials");
 }
 const token = jwt.sign({id : subAdmin._id,email:subAdmin.email,type : " subAdmin"},"supersecretkey",{expiresIn : "1d"})
 return token;
}
exports.getAllSubAdmin = async()=>{
    return await subAdminRepo.getAllSubAdmin();
}

exports.getSubAdmin = async(email)=>{
    return await subAdminRepo.getSubAdmin(email);  
}
exports.deleteSubAdmin = async(id)=>{
    return await subAdminRepo.deleteSubAdmin(id);
}
