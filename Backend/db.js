const mongoose=require("mongoose");
const mongoURI=`mongodb+srv://Anshul1807:Verma1807@cluster0.8cznrhv.mongodb.net/GoFood?retryWrites=true&w=majority&appName=Cluster0`



const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI,{usenewurlparser:true, useUnifiedTopology:true});
        console.log("Connected to MongoDB");
        if (mongoose.connection.readyState === 1) {
            console.log("Mongoose is connected.");
        } else {
            console.log("Mongoose is not connected.");
        }

        const fetchdata = await mongoose.connection.db.collection("food_Items");
        const data = await fetchdata.find({}).toArray();
        const foodcategory=await mongoose.connection.db.collection("Food_Category");
        const fodcatdata=await foodcategory.find({}).toArray();
        global.food_Items = data;
        global.food_category = fodcatdata;


    } catch (err) {
        console.log("Error connecting to MongoDB:", err);
    }
             
        

}
module.exports=mongoDB;