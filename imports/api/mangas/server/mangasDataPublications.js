// Send back all covers and french mangasName
Meteor.publish('allMangasCover', () => {
	return MangasData.find({}, {
		fields: {
			cover: 1,
			'names.fr': 1
		}
	});
});

// Send back one mangasData
Meteor.publish('oneMangasData', (id) => {
	return MangasData.find({ _id: id });
});

// Send all Mangas for a given mangaka
Meteor.publish('mangaka', (author) => {
	var newAuthor = author.split(' ');
	return MangasData.find({
		'authors.firstName': newAuthor[0],
		'authors.lastName': newAuthor[1]
	}, {
		fields: {
			authors: 1,
			tomes: 1
		}
	});
});

Meteor.publish('allMangasCoverForAdmin', () => {
	return MangasData.find({}, {
		fields: {
			cover: 1,
			'names.fr': 1,
			tomes: 1
		}
	});
});
