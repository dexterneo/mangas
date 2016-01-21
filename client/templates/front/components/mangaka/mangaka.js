Template.mangaka.helpers({
	author: function() {
		return Router.current().params.author;
	},
	serie: function() {
		var newAuthor = Router.current().params.author.split(' ');
		return MangasData.find({
			"authors.firstName": newAuthor[0],
			"authors.lastName": newAuthor[1]
		}, {
			sort: {
				"names.fr": 1
			}
		});
	},
	tome1: function() {
		return this.tomes[0];
	}
});
