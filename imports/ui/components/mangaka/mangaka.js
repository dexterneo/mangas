Template.mangaka.helpers({
	author() {
		return Router.current().params.author;
	},
	serie() {
		let newAuthor = Router.current().params.author.split(' ');
		return MangasData.find({
			'authors.firstName': newAuthor[0],
			'authors.lastName': newAuthor[1]
		}, {
			sort: {
				'names.fr': 1,
				tomes: 1
			}
		});
	},
	tome1() {
		return this.tomes[0];
	}
});
