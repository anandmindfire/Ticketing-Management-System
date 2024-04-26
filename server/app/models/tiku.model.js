import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const tikuSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'completed'],
    default: 'open'
  },
  createdBy: {
    type: String, // Change type to ObjectId
   
    required: true
  }
}, { timestamps: true });

const Tiku = model('Tiku', tikuSchema);

export default Tiku;
