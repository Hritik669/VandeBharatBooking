import mongoose from 'mongoose';
import * as models from '../models/index';

export const connectToDatabase = async ()=>{
  try {
    await mongoose.connect('mongodb://localhost:27017/vandeBharat')
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}