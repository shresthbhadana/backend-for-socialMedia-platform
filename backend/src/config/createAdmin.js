const Admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");

exports.createAdmin = async() =>{
    const exist = await Admin.findOne({email: process.env.ADMIN_EMAIL});
    if(!exist){
        const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD,10);
        await Admin.create({
            email :process.env.ADMIN_EMAIL,
            password:hash
        });

        console.log("admin created")
    }
}
