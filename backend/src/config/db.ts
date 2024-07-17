import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    // const conn = await mongoose.connect(process.env.MONGO_URI!);
    const conn = await mongoose.connect("mongodb+srv://isnoc:test123@cluster0.anz78wm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;