var ms = require('mongoose'),
	category = require('./category'),
	tag = require('./tag');

var schema = new ms.Schema({
		version: String,
		caterories: [category.schema],
		tags: [tag.schema]
	}),
	model = new ms.model('API', schema);


exports.schema = schema;
exports.model = model;