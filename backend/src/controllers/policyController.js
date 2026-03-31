const  policyService = require("../services/policyService");

exports.createPolicy = async(req,res)=>{
    try{
const {type,content} = req.body;
const data = await policyService.createPolicy(type,content);
res.status(201).json({
      message: "Policy created successfully",
      data,
    });

    }catch(error){
        res.status(500).json({error: error.message})
    }
}

exports.updatePolicy = async(req,res)=>{
    try{
        const {type,content} = req.body;
        const updatedPolicy = await policyService.updatePolicy(type,content)
        res.status(200).json({
      message: "Policy updated successfully",
      data:updatedPolicy,
    });
    }catch(error){
         res.status(500).json({error: error.message})
    }

}
exports.getPolicy = async(req,res)=>{
  try{  
    const {type} = req.params;
    const policy = await policyService.getPolicy(type)
    res.status(200).json({data: policy});
  }catch(error){
    if(error.message === "Policy not found"){
      return res.status(404).json({error: error.message});
    }
    res.status(500).json({error: error.message})
  }

}