var mongoose = require('mongoose'),
	helper = require('../core/helper.js').helper,
	crypto = require('crypto');

var UserSchema = new mongoose.Schema({
 		registrationDate: {type: Date, default: Date.now },
        name: {type: String, default: ''},
        email: {type: String, required: true},
        password: String,
        salt: String,
        status: {type: Number, default: 0},
});

var UserModel = mongoose.model('user', UserSchema);

UserModel.STATUS_ACTIVE = 1;
UserModel.STATUS_NOT_ACTIVE = 0;

UserModel.auth = function(email, password, callback) {
    email = email.toLowerCase();
	UserModel.findOne({email: email}, function checkPassword(err, user) {
		var error = null, session = null;
		if (user === null) {
			error = {error: 'Wrong email or password'};
		} else {
			password = UserModel.generatePassword(password, user.salt);
			if (user.password !== password) {
				error = {error: 'Wrong email or password'};
			}
		}

        if (error !== null) {
            user = {};
        } else {
            error = null;
        }
        callback(error, user);
	});
}

UserModel.generatePassword = function(password, salt) {
	var h = crypto.createHash('sha512');
	h.update(password);
	h.update(salt);
	return h.digest('base64');
}

UserSchema.pre('save', function(next) {
    if (this.status !== UserModel.STATUS_NON_USER) {
        this.salt = helper.randomString(16);
        this.password = UserModel.generatePassword(this.password, this.salt);
    }
    this.email = this.email.toLowerCase();
    next();
});
module.exports = UserModel;