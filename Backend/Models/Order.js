const mongoose=require("mongoose");
const orderSchema=new mongoose.Schema({
    
    email:{
        type:String,
        required:true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
        },
    order_data:{
        type:Array,
        required:true
    }
})

module.exports=mongoose.model("order",orderSchema);