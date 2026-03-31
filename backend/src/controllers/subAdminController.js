const subAdminServices = require("../services/subAdminServices.js")

exports.createSubAdmin = async(req,res)=>{
    try{
        const subAdmin = await subAdminServices.createSubAdmin(req.body);
        res.status(201).json(subAdmin);
    }catch(error){
        res.status(500).json({error : error.message});
    }
};
exports.getAllSubAdmin = async(req,res)=>{
    try{
        const subAdmins = await subAdminServices.getAllSubAdmin();
        res.json(subAdmins);
    }catch(error){
        res.status(500).json({error : error.message});
    }
}
exports.getSubAdmin = async(req,res)=>{
    try{
        const subAdmin = await subAdminServices.getSubAdmin(req.params.email);
        res.json(subAdmin);
    }catch(error){
        res.status(500).json({error : error.message});
    }
}
exports.loginSubAdmin = async(req,res)=>{
    try{
        const token = await subAdminServices.loginSubAdmin(req.body.email, req.body.password);
        res.json({token});
    }catch(error){
        res.status(500).json({error : error.message});
    }
}
exports.deleteSubAdmin = async(req,res)=>{
    try{
        await subAdminServices.deleteSubAdmin(req.params.id);
        res.json({message : "subadmin deleted successfully"})
    }catch(error){
        res.status(500).json({error : error.message});
    }
}