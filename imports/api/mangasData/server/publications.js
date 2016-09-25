import { Meteor } from 'meteor/meteor';

import { MangasData } from '../schema.js';
import { Mangas } from '../../mangas/schema.js';

// Send back all covers and french mangasName
Meteor.publish('allMangasCover', () => {
	return MangasData.find({}, {
		sort: {
			'names.fr': 1
		},
		fields: {
			cover: 1,
			'names.fr': 1
		}
	});
});

// Send back one mangasData
Meteor.publish('oneMangasData', (mangaId) => {
	return MangasData.find({ _id: mangaId });
});

// Send all Mangas for a given mangaka
Meteor.publish('mangaka', (author) => {
	let newAuthor = author.split(' ');
	return MangasData.find({
		'authors.firstName': newAuthor[0],
		'authors.lastName': newAuthor[1]
	}, {
		fields: {
			authors: 1,
			tomes: 1,
			names: 1
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

Meteor.publish('allMangasDataForUser', (userId, owned) => {
	let data = Mangas.find({
		userId,
		owned
	}, {
		fields: {
			mangaId: 1
		}
	}).fetch();
	let mangaIdForUser = data.reduce((prev, cur, index, array) => {
		prev.push(cur.mangaId);
		return prev;
	}, []);
	return MangasData.find({
		_id: {
			$in: mangaIdForUser
		}
	}, {
		fields: {
			'tomes.cover': 1,
			'tomes.title': 1,
			'tomes.tomeId': 1,
			'tomes.number': 1,
			names: 1
		}
	});
});
