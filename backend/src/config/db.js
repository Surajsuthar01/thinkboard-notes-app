import mongoose from "mongoose"

console.log("DB Name:", mongoose.connection.name);


export const connectDB =async ()=>{
    try {
          await mongoose.connect(process.env.MONGO_URI);
          console.log("Mongodb Connected Successfully !");
    } catch (error){
        console.error("Error Connecting to Mongodb",error);
        process.exit(1);

    }

};