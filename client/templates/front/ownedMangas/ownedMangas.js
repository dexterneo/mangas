Template.ownedMangas.helpers({
	mangasList: function() {
		return Mangas.find({
			"user": Meteor.userId(),
			"owned": true
		}, {
			sort: {
				"tomeNumber": 1
			}
		});
	}
});
