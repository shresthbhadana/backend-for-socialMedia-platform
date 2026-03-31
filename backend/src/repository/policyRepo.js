

const Policy = require("../models/policyModel");

const findByType = (type) => {
  return Policy.findOne({ type });
};

const updatePolicy = (type, content) => {
  return Policy.findOneAndUpdate(
    { type },
    { content },
{new : true}
  );
};
const createPolicy = async(type, content)=>{
    return await Policy.create({type, content})
}

module.exports = {
  findByType,
  updatePolicy,
  createPolicy,

};

