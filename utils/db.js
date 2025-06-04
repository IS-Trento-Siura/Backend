/*import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoConnect = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error('Mongo URI is not defined');
        }

        await mongoose.connect(mongoURI);

        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

export default mongoConnect;*/



// utils/db.js
import mongoose from 'mongoose';

export const mongoConnect = async (uri = process.env.MONGO_URI) => {
  try {
    // Check if already connected to avoid multiple connections
    if (mongoose.connection.readyState === 1) {
      console.log('MongoDB already connected');
      return;
    }
    
    // Disconnect if there's an existing connection with different URI
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export const mongoDisconnect = async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
      console.log('MongoDB disconnected');
    }
  } catch (error) {
    console.error('MongoDB disconnection error:', error);
  }
};