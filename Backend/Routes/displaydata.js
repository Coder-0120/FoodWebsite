const express=require("express");
const router=express.Router();

router.post("/fooddata", (req,res)=>{
    try{
        res.send({ food_Items: global.food_Items, food_category: global.food_category });

    }
    catch(error){
        res.send("server error")
    }
})
module.exports=router;