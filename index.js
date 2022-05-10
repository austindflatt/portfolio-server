const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const projectsRoute = require('./routes/projects');
const messagesRoute = require('./routes/messages');
const aboutRoute = require('./routes/about');
const skillsRoute = require('./routes/skills');
const videosRoute = require('./routes/videos');

dotenv.config();

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('MongoDB Connected'))
	.catch((err) => {
		console.log(err)
	});

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/projects', projectsRoute);
app.use('/api/messages', messagesRoute);
app.use('/api/about', aboutRoute);
app.use('/api/skills', skillsRoute);
app.use('/api/videos', videosRoute);

app.listen(3001, () => {
	console.log('Server is running...')
})