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
const multer = require('multer');

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

// const storage = multer.diskStorage({
// 	destination:(req, file, cb) => {
// 		cb(null, 'images')
// 	}, filename: (req, file,cb) => {
// 		cb(null, req.body.image)
// 	}
// });

// const upload = multer({ storage: storage });
// app.post('/api/upload', upload.single('file'), (req, res) => {
// 	res.status(200).json('File has been uploaded');
// })

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