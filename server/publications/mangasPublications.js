// Send back all owned mangas
Meteor.publish('allOwnedMangas', function(userId) {
	return Mangas.find({
		"user": userId,
		"owned": true
	});
});

// Send back all missing mangas
Meteor.publish('allMissingMangas', function(userId) {
	return Mangas.find({
		"user": userId,
		"owned": false
	});
});
