var mongoose = require('mongoose');

var ApiSchema = new mongoose.Schema({
	name: {type: String, required: true},
	users: {type: Array}
});