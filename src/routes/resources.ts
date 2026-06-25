import express from 'express';
import Resource from '../models/Resource';
import { checkAuth } from '../middleware/auth';

const router = express.Router();

// POST /resources - Save a new resource (must be logged in)
router.post('/', checkAuth, async (req, res) => {
  try {
    const { url, title, tags, note } = req.body;
    const userId = (req as any).userId;

    const newResource = new Resource({
      url,
      title,
      tags: tags || [],
      note: note || '',
      userId,
    });

    await newResource.save();
    res.status(201).json({ message: 'Resource saved successfully', resourceId: newResource._id });
  } catch (error) {
    res.status(500).json({ message: 'Error saving resource', error });
  }
});

// GET /resources - Get all resources for the logged-in user
router.get('/', checkAuth, async (req, res) => {
  try {
    const userId = (req as any).userId;

    const resources = await Resource.find({ userId });
    res.json({ resources });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching resources', error });
  }
});

// PATCH /resources/:id - Update a resource (must be logged in)
router.patch('/:id', checkAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { tags, note, collectionId } = req.body;
    const userId = (req as any).userId;

    // Only update if this resource belongs to the logged-in user
    const updatedResource = await Resource.findOneAndUpdate(
      { _id: id, userId },
      { tags, note, collectionId },
      { new: true }
    );

    if (!updatedResource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.json({ message: 'Resource updated', resource: updatedResource });
  } catch (error) {
    res.status(500).json({ message: 'Error updating resource', error });
  }
});

// DELETE /resources/:id - Delete a resource (must be logged in)
router.delete('/:id', checkAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId;

    // Only delete if this resource belongs to the logged-in user
    const deletedResource = await Resource.findOneAndDelete({ _id: id, userId });

    if (!deletedResource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.json({ message: 'Resource deleted from library' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting resource', error });
  }
});

export default router;