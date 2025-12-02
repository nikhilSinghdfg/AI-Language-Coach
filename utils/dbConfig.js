import { error } from "console";
import mongoose from "mongoose";


export async function DBconnect() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');

        })
        connection.on('error',()=>{
            console.error('MongoDB connection failed');
              process.exit(1)
        })



    } catch (error) {
        console.log('MongoDB connection failed');
        console.error(error);
        process.exit(1)
    }
}