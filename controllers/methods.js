var methodModel = require('../models/method.js');

function controller() {

	return {
		get: function(req, res) {
			var query = req.query;
			methodModel.find(query, function(err, methods) {
				res.json(methods);
			});
		},

		post: function(req, res) {
			(new methodModel(req.body)).save(function(err, method) {
				res.json(method);
			});
		}
	}
}

module.exports = controller();