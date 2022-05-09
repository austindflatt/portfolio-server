const router = require('express').Router();
const Video = require('../models/videosModel');
const { verify } = require('./verifyToken');

// CREATE VIDEO
router.post('/create', async (req, res) => {
  const newVideo = new Video(req.body);
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json({ message: 'Video created successfully', payload: savedVideo });
  } catch (error) {
    res.status(500).json(error)
  }
});

// UPDATE VIDEO
router.put('/update/:id', async (req, res) => {
  try {
    const updatedVideo = await Video.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updatedVideo);
  } catch (error) {
    res.status(500).json(error)
  }
});

// DELETE VIDEO
router.delete('/delete/:id', async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Video Info deleted successfully' });
  } catch (error) {
    res.status(500).json(error)
  }
});

// GET VIDEO
router.get('/find/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json({ message: 'Video Info', payload: video });
  } catch (error) {
    res.status(500).json(error)
  }
});

// GET ALL VIDEOS
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos.reverse());
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;