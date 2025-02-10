
// Controllers.js=>userController.js(file name)
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Register User 
const registerUser = async (req,res)=>{
    const {name,email,password,mobile}= req.body;

    try {
        const user = await User.create({name,email,password,mobile});
        const token = jwt.sign({_id:user._id,
                                name:user.name,
                                email:user.email
        },
            process.env.JWT_SECRET,{expiresIn:'1h'});
            res.json({token,user})
    } catch (error) {
        res.status(400).json({message:'Error creating User', error});
    }
};

// Login User 
const loginUser = async (req,res)=>{
    const { email,password} = req.body;

    try {
        const user = await User.findOne({email});

        if(!user || !(await bcrypt.compare(password,user.password))){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.json({token,user});
    } catch (error) {
        res.status(400).json({message:'Error Logging in',error});
    }
};

// Show all Users 
const showUsers = async (req,res)=>{
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(400).json({message:"Error fetching users",error});
    }
};


// Edit/Update Users
const updateUser = async(req,res)=>{
    const {name,email,mobile} =req.body;

    try {
        const updateUser = await User.findByIdAndUpdate(req.params._id , {name,email,mobile},{new:true});

        res.json({message: "User Updated Successfully......!",user:updateUser})
    } catch (error) {
        res.status(400).json({message:"Error Updating users",error});
    }
}

// Delete User

const deleteUser = async(req,res)=>{
    try {
        const deleteUser = await User.findByIdAndDelete(req.params._id);
        res.json({message: "User Delete  Successfully......!",user:updateUser})
    } catch (error) {
        res.status(400).json({message:"Error Deleting Usera users",error});
    }
}




module.exports = {registerUser,loginUser,showUsers,deleteUser,updateUser}

