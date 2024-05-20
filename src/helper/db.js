import mongoose from 'mongoose';


export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "work_manager",
            useNewUrlParser: true, // Make sure to include these options if you haven't already
            useUnifiedTopology: true
        });
        console.log("db connected ....");
        console.log(connection);
    } catch (error) {
        console.log("failed to connect with database", error)
    }
}
