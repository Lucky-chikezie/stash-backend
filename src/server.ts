import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import resourceRoutes from './routes/resources';
import collectionRoutes from './routes/collections';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/stash';

app.use(express.json());

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

app.use('/auth', authRoutes);
app.use('/resources', resourceRoutes);
app.use('/collections', collectionRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Stash API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;