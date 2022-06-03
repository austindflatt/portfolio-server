const router = require('express').Router();
const Project = require('../models/projectsModel');
const { verify } = require('./verifyToken');

// CREATE PROJECT
router.post('/create', verify, async (req, res) => {
  const newProject = new Project(req.body);
  if(req.user.isAdmin){
    try {
      const savedProject = await newProject.save();
      res.status(200).json({ message: 'Project created successfully', payload: savedProject.reverse() });
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.status(403).json("You do not have permission!")
  }
});

// UPDATE PROJECT
router.put('/update/:id', verify, async (req, res) => {
  if(req.user.isAdmin) {
    try {
      await Project.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      const allProjects = await Project.find()
      return res.status(200).json(allProjects.reverse());
    } catch (error) {
      return res.status(500).json(error)
    }
  } else {
    res.status(403).json("You do not have permission!")
  }
});

// DELETE PROJECT
router.delete('/delete/:id', verify, async (req, res) => {
  if(req.user.isAdmin){
    try {
      const deletedProject = await Project.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Project deleted successfully', payload: deletedProject });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You do not have permission!")
  }
});

// GET PROJECT
router.get('/find/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.status(200).json({ message: 'Project Info', payload: project });
  } catch (error) {
    res.status(500).json(error)
  }
});

// GET ALL PROJECTS
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects.reverse());
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;