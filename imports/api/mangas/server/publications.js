import { Meteor } from 'meteor/meteor';

import { Mangas } from '../schema.js';

// Send back all owned mangas
Meteor.publish('allOwnedMangas', (userId) => {
	return Mangas.find({
		userId,
		owned: true
	});
});

// Send back all missing mangas
Meteor.publish('allMissingMangas', (userId) => {
	return Mangas.find({
		userId,
		owned: false
	});
});

// Send back the data about a tome for a user
Meteor.publish('tomeDetails', (userId, mangaId) => {
	return Mangas.find({ userId, mangaId });
});

// Send back all tomes for a mangasName
Meteor.publish('allTomes', (userId, mangaId) => {
	return Mangas.find({
		userId,
		mangasId
	});
});
