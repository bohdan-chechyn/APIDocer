var mongoose = require('mongoose');

var MethodSchema = new mongoose.Schema({
	name: String,
	call: String,
	input: String,
	output: String,
	example: String,
	tags: Array,
	category: String
});