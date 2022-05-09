const mongoose = require('mongoose');

const VideosSchema = new mongoose.Schema({
	title: { type: String, required: true, unique: true },
	image: { type: String, required: true },
	videoLink: { type: String, required: true },
	featuredVideo: { type: Boolean, default: false },
}, { timestamps: true })

module.exports = mongoose.model("Videos", VideosSchema);