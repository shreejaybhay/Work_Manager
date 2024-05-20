import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "work_manager",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Time out after 5 seconds instead of 10
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        });
        console.log("DB connected ....");
        console.log(`Connected to database: ${connection.name}`);
    } catch (error) {
        console.error("Failed to connect with database:", error.message);
    }
};
