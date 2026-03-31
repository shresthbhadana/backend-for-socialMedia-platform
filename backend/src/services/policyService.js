const policyRepo = require("../repository/policyRepo");

exports.createPolicy = async(type,content)=>{
      if (!type || !content) {
    throw new Error("Type and content required");
  }
  return await policyRepo.createPolicy(type,content);
}
exports.updatePolicy = async(type,content)=>{
        if (!type || !content) {
    throw new Error("Type and content required");
  }
  return await policyRepo.updatePolicy(type,content)
}

exports.getPolicy = async(type)=>{
    const policy = await policyRepo.findByType(type);

  if (!policy) {
    throw new Error("Policy not found");
  }

  return policy;
}