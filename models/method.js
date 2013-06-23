var mongoose = require('mongoose');

var MethodSchema = new mongoose.Schema({
	name: String,
	type: String,
	description: String,
	input: String,
	output: String,
	example: String,
	tags: Array,
	category: String,
	entityId: Number
});

var MethodModel = mongoose.model('methods', MethodSchema);

module.exports = MethodModel;