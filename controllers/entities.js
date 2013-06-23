function controller() {

	return {
		get: function(req, res) {
			res.json([
				{id: 1, name: 'User'},
				{id: 2, name: 'Gossip'},
				{id: 3, name: 'Group'}
				]);
		}
	}
}

module.exports = controller();