const express=require("express");
const router=express.Router();
const User=require("../Models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const jwtsecret="mynameisanshulverma1807";

router.post("/createuser",async(req,res)=>{
    const{name,email,password,location,date}=req.body;

    const salt=await bcrypt.genSalt(10);
    const hashpassword=await bcrypt.hash(password,salt);
    try{
        await User.create({
            name,
            email,
            password:hashpassword,
            location,
            date
        })
        res.json({success:true});

    }
    catch(err){
        console.log(err);
        res.json({success:false});
    }
})

router.post("/loginuser",async(req,res)=>{
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }
    try{
        const userdata = await User.findOne({ email });
        if(!userdata){
            return res.status(400).json({success:false,message:"User not found"});
        }
        const pswdcompare=await bcrypt.compare(password,userdata.password);
        if(!pswdcompare){
            return res.status(400).json({success:false,message:"Invalid credentials"})
        }
        const data={
            user:{
                id:userdata.id
            }
        }
        const authtoken=jwt.sign(data,jwtsecret);
        return res.json({success:true,authtoken:authtoken});

    }
    catch(err){
        console.log(err);
        res.json({success:false});
    }
    
})


module.exports=router;