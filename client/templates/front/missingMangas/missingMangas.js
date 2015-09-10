Template.missingMangas.helpers({
	mangasList: function() {
		return Mangas.find({
			"user": Meteor.userId(),
			"owned": false
		}, {
			sort: {
				"tomeNumber": 1
			}
		});
	}
});
