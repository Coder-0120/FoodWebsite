const express = require('express');
const router = express.Router();
const Order = require('../Models/Order');

router.post('/Orderdata', async (req, res) => {
    let data = req.body.order_data;
    await data.splice(0, 0, { Order_date: req.body.order_date });

    let eId = await Order.findOne({ email: req.body.email });
    if (eId == null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: data
            }).then(() => {
                res.status(200).json({ success: true });
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({ success: false });
        }
    }

    else {
        try {
            await Order.findOneAndUpdate({ email: req.body.email }, {
                $push: { order_data: data }
            }).then(() => {
                res.json({ success: true });
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({ success: false });
        }
    }
})


router.post("/myorderdata",async(req,res)=>{
    try{
        let mydata=await Order.findOne({email:req.body.email});
        res.json({orderdata:mydata});

    }
    catch(err){
        res.send("Error Occured")

    }
})
module.exports = router;