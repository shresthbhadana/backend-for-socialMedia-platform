const Terms = require("../models/termsModel");

exports.getTerms = async(title)=>{
    return await Terms.findOne({title});
};
exports.createTerms = async(data)=>{
    return Terms.create(data)
};
exports.updateTerms = async(title,content)=>{
    return Terms.findOneAndUpdate(
        {title},
        {content},
        {new : true}
    )
}