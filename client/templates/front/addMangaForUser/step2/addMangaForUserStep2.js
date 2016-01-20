Template.addMangaForUserStep2.helpers({
	manga: function() {
		return MangasData.findOne({
			'_id': Router.current().params._id
		});
	}
});

Template.addMangaForUserStep2.events({});
