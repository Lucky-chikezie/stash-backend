import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  note: {
    type: String,
    default: '',
  },
  userId: {
    type: String,
    required: true,
  },
  collectionId: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;