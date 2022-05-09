const router = require('express').Router();
const Message = require('../models/messageModel');
const { verify } = require('./verifyToken');

// CREATE MESSAGE
router.post('/send', async (req, res) => {
	const newMessage = new Message(req.body);
	try {
		const savedMessage = await newMessage.save();
		res.status(200).json({ message: 'Message sent successfully', payload: savedMessage });
	} catch (error) {
		res.status(500).json(error)
	}
});

// DELETE MESSAGE
router.delete('/delete/:id', verify, async (req, res) => {
  if(req.user.isAdmin){
    try {
      await Message.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.status(403).json("You do not have permission!")
  }
});

// GET MESSAGE
router.get('/find/:id', verify, async (req, res) => {
  if(req.user.isAdmin){
    try {
      const message = await Message.findById(req.params.id);
      res.status(200).json({ message: 'Message Info', payload: message });
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.status(403).json("You do not have permission!")
  }
});

// GET ALL MESSAGES
router.get('/', verify, async (req, res) => {
  if(req.user.isAdmin){
    try {
      const messages = await Message.find();
      return res.status(200).json(messages.reverse());
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.status(403).json("You do not have permission!")
  }
});

module.exports = router;