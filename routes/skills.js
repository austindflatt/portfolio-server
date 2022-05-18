const router = require('express').Router();
const Skill = require('../models/skillsModel');
const { verify } = require('./verifyToken');

// CREATE SKILL
router.post('/create', verify, async (req, res) => {
  const newSkill = new Skill(req.body);
  if(req.user.isAdmin){
    try {
      const savedSkill = await newSkill.save();
      res.status(200).json({ message: 'Skill created successfully', payload: savedSkill });
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.status(403).json("You do not have permission!")
  }
});

// UPDATE SKILL
router.put('/update/:id', verify, async (req, res) => {
  if(req.user.isAdmin){
    try {
      await Skill.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      const allSkills = await Skill.find()
      return res.status(200).json(allSkills.reverse());
    } catch (error) {
      return res.status(500).json(error)
    }
  } else {
    res.status(403).json("You do not have permission!")
  }
});

// DELETE SKILL
router.delete('/delete/:id', verify, async (req, res) => {
  if(req.user.isAdmin){
    try {
      await Skill.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Skill Info deleted successfully' });
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.status(403).json("You do not have permission!")
  }
});

// GET SKILL
router.get('/find/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    res.status(200).json({ message: 'Skill Info', payload: skill });
  } catch (error) {
    res.status(500).json(error)
  }
});

// GET ALL SKILLS
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills.reverse());
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;