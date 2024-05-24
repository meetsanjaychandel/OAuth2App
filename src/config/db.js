import mongoose from "mongoose";

const db = process.env.MONGO_URI;

const connectDB = async()=>{
    try{
        const connectionInstance = await mongoose.connect(db,
        { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`mongodb connected !! DB Host: ${connectionInstance.connection.host}`)
    }
    catch(error){
        console.log('MONGODB connection error',error);
        process.exit(1);
    }
}


export default connectDB