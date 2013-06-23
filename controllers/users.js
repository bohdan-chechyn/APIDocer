function controller() {

	return {
		auth: function(req, res) {

			res.json({status: 'OK', token: '12345'});
		}
	}
}

module.exports = controller();