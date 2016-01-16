// Send back all covers and french mangasName
Meteor.publish('allMangasCover', function() {
	return MangasData.find({}, {
		fields: {
			'cover': 1,
			'names.fr': 1
		}
	});
});

// Send back all mangasData
Meteor.publish('allMangasData', function() {
	return MangasData.find({});
});

// Send back one mangasData
Meteor.publish('oneMangasData', function(id) {
	return MangasData.find({
		'_id': id
	});
});
