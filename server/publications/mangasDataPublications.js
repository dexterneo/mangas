// Send back all mangas
Meteor.publish('allMangasCover', function() {
	return MangasData.find({}, {
		fields: {
			"cover": 1,
			"names.fr": 1
		}
	});
});

Meteor.publish('allMangasData', function() {
	return MangasData.find({});
});

Meteor.publish('oneMangasData', function(mangaId) {
	return MangasData.find({
		_id: mangaId
	});
});
