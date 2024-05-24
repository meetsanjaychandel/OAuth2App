import dotenv from "dotenv";
dotenv.config({path:'./.env'});

import app from "./app.js";
import connectDB from "./config/db.js";


connectDB().then(()=>{
app.listen(process.env.PORT || 3000, 
    () => console.log(`Server started on port ${process.env.PORT}`));
})
.catch((err)=>{
    console.log("MONGODB connection failed !!",err)
})