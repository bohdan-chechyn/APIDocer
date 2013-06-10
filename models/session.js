var mongoose = require('mongoose');

var SessionSchema = new mongoose.Schema({
	userId: String,
	data: Object
});

var SessionModel = mongoose.model('sessions', SessionSchema);

SessionModel.retrive = function(token, callback) {
	SessionModel.findById(token, handle);

	function handle(err, session) {
		if (err) {
			return callback(err);
		}
		return callback(null, session);
	}
}