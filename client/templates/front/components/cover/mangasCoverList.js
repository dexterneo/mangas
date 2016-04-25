Template.mangasCoverList.helpers({
	covers() {
		return MangasData.find({}, {
			sort: {
				"names.fr": 1
			},
			fields: {
				cover: 1
			}
		});
	}
});
