import { Meteor } from 'meteor/meteor';

import { Mangas } from '../schema.js';

// Send back all owned mangas
Meteor.publish('allOwnedMangas', (userId) => {
	return Mangas.find({
		user: userId,
		owned: true
	}, {
		fields: {
			title: 1,
			cover: 1,
			name: 1,
			number: 1,
			owned: 1,
			user: 1
		}
	});
});

// Send back all missing mangas
Meteor.publish('allMissingMangas', (userId) => {
	return Mangas.find({
		user: userId,
		owned: false
	}, {
		fields: {
			title: 1,
			cover: 1,
			name: 1,
			number: 1,
			user: 1,
			owned: 1
		}
	});
});

// Send back the data about a tome
Meteor.publish('tomeDetails', (id) => {
	return Mangas.find({ _id: id });
});

// Send back all tomes for a mangasName
Meteor.publish('allTomes', (userId, name) => {
	return Mangas.find({
		user: userId,
		name
	});
});

// Send back all tomes for a userId
Meteor.publish('allTomesForUser', (userId) => {
	return Mangas.find({ user: userId }, {
		fields: {
			owned: 1,
			number: 1,
			user: 1
		}
	});
});
