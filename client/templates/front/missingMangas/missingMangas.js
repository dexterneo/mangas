Template.missingMangas.helpers({
	mangasList: function() {
		return Mangas.find({
			"user": Meteor.userId(),
			"owned": false
		}, {
			sort: {
				"tomeNumber": 1
			},
			fields: {
				"cover": 1,
				"mangasName": 1,
				"tomeNumber": 1,
				"owned": 1
			}
		});
	}
});
