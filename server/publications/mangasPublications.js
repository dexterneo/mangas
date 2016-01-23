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

// Send back the data about a tome
Meteor.publish('tomeDetails', function(id) {
	return Mangas.find({
		"_id": id
	});
});

// Send back all tomes for a mangasName
Meteor.publish('allTomes', function(userId, name) {
	return Mangas.find({
		"user": userId,
		"name": name
	});
});

// Send back all tomes for a userId
Meteor.publish('allTomesForUser', function(userId) {
	return Mangas.find({
		"user": userId
	});
});
