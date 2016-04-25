Template.ownedMangas.helpers({
	mangasList() {
		return Mangas.find({
			user: Meteor.userId(),
			owned: true
		}, {
			sort: {
				number: 1
			},
			fields: {
				cover: 1,
				name: 1,
				number: 1,
				owned: 1
			}
		});
	}
});
