// global.foodData = require('./db')(function call(err, data, CatData) {
//     // console.log(data)
//     if(err) console.log(err);
//     global.foodData = data;
//     global.foodCategory = CatData;
//   })
  
const express=require("express");
const app=express();
const cors=require("cors");
const router = require("./Routes/Createuser");
const disrouter=require("./Routes/displaydata");
// const loginrouter = require("./Routes/Loginuser");
const mongoDB=require("./db");

app.use(cors({
    origin: 'http://localhost:3001', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoDB();

app.get("/",(req,res)=>{
    res.send("Hello World")
})
app.use("/api/",router);
app.use("/api/",disrouter);
app.use("/api",require("./Routes/Orderdata"));
app.listen(3000,()=>{
    console.log("Server started on port 3000")
})