const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5 // Added minlength for name validation

    },
    location:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
        },
    password:{
        type:String,
        required:true,
        minlength:5
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("User",userSchema);