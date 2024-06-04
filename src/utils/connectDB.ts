import mongoose from 'mongoose';

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error('MONGO_URI is not defined');
  }

  if (mongoose.connections[0].readyState) {
    // Use existing database connection
    return;
  }

  // Use new database connection
  await mongoose.connect(mongoUri, {});
};

export default connectDB;
