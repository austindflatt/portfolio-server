const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
	title: { type: String, required: true, unique: true },
	description: { type: String, required: true },
	techUsed: { type: [String], required: true },
	image: { type: String },
	githubLink: { type: String, required: true, unique: true },
	liveLink: { type: String },
	youtubeId: { type: String },
	showViewLive: { type: Boolean, default: true },
	featuredProject: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model("Project", ProjectSchema);