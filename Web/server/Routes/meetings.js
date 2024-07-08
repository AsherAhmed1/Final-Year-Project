import express from 'express';
const router = express.Router();
import Meeting from '../models/Meeting.js';

// Get all meetings
router.get('/', async (req, res) => {
  try {
    const meetings = await Meeting.find();
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new meeting
router.post('/', async (req, res) => {
  const meeting = new Meeting({
    title: req.body.title,
    startDate: req.body.startDate,
    duration: req.body.duration,
  });

  try {
    const newMeeting = await meeting.save();
    res.status(201).json(newMeeting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a meeting
router.delete('/:id', async (req, res) => {
  try {
    await Meeting.findByIdAndDelete(req.params.id);
    res.json({ message: 'Meeting deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
