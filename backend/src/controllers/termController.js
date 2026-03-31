const termService = require("../services/termService");

exports.createTerms = async(req,res)=>{
    try{
const {title,content} = req.body;
const data = await termService.createTerms(title,content)
res.status(201).json({
      message: "Terms created successfully",
      data,
    });


    }catch(error){
            res.status(500).json({error: error.message})
    }
}
exports.updateTerms = async(req,res)=>{
    try{
        const {title, content} = req.body;
        const updatedTerms = await termService.updateTerms(title,content);
          res.status(200).json({
      message: "Terms updated successfully",
      data:updatedTerms,
    });
    }catch(error){
          res.status(500).json({error: error.message})
    }
}
exports.getTerms = async(req,res)=>{
  try{ 
     const {title} = req.params;
    const terms = await termService.getTerms(title)
    res.status(200).json({data: terms});
  }catch(error){
    if(error.message === "terms not found"){
      return res.status(404).json({error: error.message});
    }
    res.status(500).json({error: error.message})
  }

}