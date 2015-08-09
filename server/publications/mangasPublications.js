// Send back all owned mangas
Meteor.publish('allOwnedMangas', function(userId) {
	return Mangas.find({
		"user": userId,
		"owned": true
	});
});
