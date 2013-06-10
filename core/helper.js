exports.helper = {
	randomString: function(string_length) {
	    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	    var s = '';
	    if (string_length === undefined)
	    	string_length = 16;
	    for (var i=0; i<string_length; i++) {
	        var rnum = Math.floor(Math.random() * chars.length);
	        s += chars.substring(rnum,rnum+1);
	    }
	    return s;
	},

	simpleOkResponse: function(res) {
		return function (err) {
			if (err) {
				return res.json(err);
			}
			return res.json({status: "OK"});
		}
	},

	simpleCollectionResponse: function(res) {
		return function(err, collection) {
			if (err) {
				return res.json(err);
			}
			console.log(collection);
			return res.json(collection);
		}
	}
}