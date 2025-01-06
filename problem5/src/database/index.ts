import mongoose from 'mongoose';

const connectDB = async (MONGODB_URI: string) => {
    try {
        await mongoose.connect(MONGODB_URI, {
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;