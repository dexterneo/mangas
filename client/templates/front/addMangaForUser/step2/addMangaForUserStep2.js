Template.addMangaForUserStep2.helpers({
	manga: function() {
		return MangasData.find({
			'_id': Router.current().params._id
		});
	}
});

Template.addMangaForUserStep2.events({});
