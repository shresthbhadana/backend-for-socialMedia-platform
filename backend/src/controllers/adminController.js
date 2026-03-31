const adminService = require("../services/adminService");


exports.adminLogin= async(req,res) =>{
    const token  = await adminService.adminLogin(req.body);
    res.json({token})

}

exports.getAllUsers = async (req, res) => {
    const users = await adminService.getAllUsers();
    res.json(users);
};




exports.deleteUser = async (req, res) => {
    const result = await adminService.deleteUser(req.params.id);
    res.json(result);
};


exports.getAllPosts = async (req, res) => {
    const posts = await adminService.getAllPosts();
    res.json(posts);
};

exports.blockUser = async (req, res) => {
    const result = await adminService.blockUser(req.params.id);
    res.json({ message: "User blocked successfully", user: result });
};

exports.deletePost = async (req, res) => {
    const result = await adminService.deletePost(req.params.id);
    res.json(result);
};