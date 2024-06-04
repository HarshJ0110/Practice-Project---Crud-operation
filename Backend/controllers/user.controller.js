const User = require("../models/user.schema.js")
exports.createUser = async (req,res)=>{
    console.log(req.body);
    const user = await User.create(req.body);
    if(!user){
        res.status(400).json({
            message: "Error in creating User",
            success: false
        })
    }
    res.status(200).json({
        message: "User created successfully",
        user: user,
        success: true
    })
}

exports.getUsers = async (_,res)=>{
    const users = await User.find();
    if(!users){
        res.status(404).json({
            message: "No user found",
            success: false
        })
    }
    res.status(200).json({
        message: "Users found successfully",
        users: users,
        success: true
    })
}

exports.deleteUsers = async(req,res) =>{
    console.log(req.params.id);
    const user = await User.findById(req.params.id)
    if(!user){
        res.status(404).json({
            message: "No user found",
            success: false
        })
    }
    await User.findByIdAndDelete(req.params.id)

    res.status(200).json({
        message: `${user.name} deleted successfully`,
        success: true
    })
}

exports.updateUser = async(req,res) =>{
    console.log(req.params.id);
    const {name, email, password, gender, course, hobby, address} = req.body;
    const user = await User.findById(req.params.id)
    if(!user){
        res.status(404).json({
            message: "No user found",
            success: false
        })
    }

    user.name = name; 
    user.email = email; 
    user.password = password; 
    user.hobby = hobby;
    user.gender = gender; 
    user.course = course;
    user.address = address;

    await user.save();

    const updatedUser = await User.findById(req.params.id)

    res.status(200).json({
        message: "User Update successfully",
        updatedUser: updatedUser,
        success: true
    })
}