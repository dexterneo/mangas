Template.mangaka.helpers({
	author: function() {
		return Router.current().params.author;
	},
	serie: function() {
		return Mangas.find({
			"user": Meteor.userId(),
			"author": Router.current().params.author,
			"tomeNumber": 1
		}, {
			sort: {
				"mangasName": 1
			}
		});
	}
});
