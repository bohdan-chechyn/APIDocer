var mongoose = require('mongoose');

var TagsSchema = new mongoose.Schema({
	name: String,
	apiId: String
});

var TagsModel = mongoose.model('tags', TagsSchema);

module.exports = TagsModel;