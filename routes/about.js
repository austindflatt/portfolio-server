const router = require('express').Router();
const About = require('../models/aboutModel');
const { verify } = require('./verifyToken');

// CREATE ABOUT
router.post('/create', verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newAbout = new About(req.body);
    try {
      const savedAbout = await newAbout.save();
      res.status(200).json({ message: 'About Info created successfully', payload: savedAbout });
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.status(403).json("You do not have permission!");
  }
});

// UPDATE ABOUT
router.put('/update/:id', verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedAbout = await About.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      res.status(200).json(updatedAbout);
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.status(403).json("You do not have permission!");
  }
});

// DELETE ABOUT
router.delete('/delete/:id', verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await About.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'About Info deleted successfully' });
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.status(403).json("You do not have permission!");
  }
});

// GET ABOUT
router.get('/find/:id', async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    res.status(200).json({ message: 'About Info', payload: about });
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;