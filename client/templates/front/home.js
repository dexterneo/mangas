Template.home.helpers({
	covers: function() {
		return MangasData.find({}, {
			sort: {
				"names.fr": 1
			}
		});
	}
});
