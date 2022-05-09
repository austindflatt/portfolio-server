const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
	headshot: { type: String, required: true },
	githubUrl: { type: String, required: true },
	linkedinUrl: { type: String, required: true },
	twitterUrl: { type: String, required: true },
	youtubeUrl: { type: String, required: true },
	twitchUrl: { type: String, required: true },
	aboutMe: { type: String, required: true },
	aboutMeShort: { type: String, required: true },
}, { timestamps: true })

module.exports = mongoose.model("About", AboutSchema);