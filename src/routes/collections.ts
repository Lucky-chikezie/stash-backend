import express from 'express';
import Collection from '../models/Collection';
import { checkAuth } from '../middleware/auth';

const router = express.Router();

// POST /collections - Create a new collection (must be logged in)
router.post('/', checkAuth, async (req, res) => {
  try {
    const { name } = req.body;
    const userId = (req as any).userId;

    // Check if a collection with this name already exists for this user
    const existingCollection = await Collection.findOne({ name, userId });
    if (existingCollection) {
      return res.status(400).json({ message: 'A collection with this name already exists' });
    }

    const newCollection = new Collection({ name, userId });
    await newCollection.save();

    res.status(201).json({ message: 'Collection created', collectionId: newCollection._id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating collection', error });
  }
});

// GET /collections - Get all collections for the logged-in user
router.get('/', checkAuth, async (req, res) => {
  try {
    const userId = (req as any).userId;

    const collections = await Collection.find({ userId });
    res.json({ collections });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching collections', error });
  }
});

export default router;