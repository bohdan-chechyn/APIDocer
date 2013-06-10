var mongoose = require('mongoose');

var SessionSchema = new mongoose.Schema({
	userId: String,
	data: Object
});