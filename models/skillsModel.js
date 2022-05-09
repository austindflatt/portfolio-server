const mongoose = require('mongoose');

const SkillsSchema = new mongoose.Schema({
	name: { type: String, unique: true, required: true },
}, { timestamps: true })

module.exports = mongoose.model("Skills", SkillsSchema);