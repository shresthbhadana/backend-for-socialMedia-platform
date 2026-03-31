
const termRepo = require("../repository/termsRepo");
exports.getTerms = async(title)=>{
    const terms = await termRepo.getTerms(title)
    if(!terms){
        throw new Error("terms not found")
    }
    

    return terms
}

exports.createTerms = async(title,content)=>{
    if(!title || !content){
        throw new Error("title and content is required")
    }
    return await termRepo.createTerms({title, content})
}
exports.updateTerms = async(title,content)=>{
    const terms = await termRepo.getTerms(title);
       if(!terms){
        throw new Error("terms not found")
    }
    return await termRepo.updateTerms(title,content)

}