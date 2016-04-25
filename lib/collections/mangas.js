Mangas = new Mongo.Collection('mangas');

var Schemas = {};

Schemas.Mangas = new SimpleSchema({
	title: {
		type: String,
		label: 'Title',
		optional: true
	},
	user: {
		type: String,
		label: 'User'
	},
	name: {
		type: String,
		label: 'Mangas name'
	},
	author: {
		type: String,
		label: 'Author'
	},
	number: {
		type: Number,
		label: 'N° tome',
		min: 1
	},
	isbn: {
		type: String,
		label: 'ISBN or Barcode'
	},
	cover: {
		type: String,
		label: 'Cover url of the manga tome',
		regEx: SimpleSchema.RegEx.Url
	},
	releaseDate: {
		type: String,
		label: 'Release date of the manga tome',
		optional: true,
		defaultValue: '1900/01/01'
	},
	owned: {
		type: Boolean,
		label: 'Owned'
	},
	editor: {
		type: String,
		label: 'Editor'
	},
	version: {
		type: String,
		label: 'Version of the manga tome'
	},
	genre: {
		type: String,
		label: 'Genre',
		optional: true
	}
});

Mangas.attachSchema(Schemas.Mangas);

Meteor.methods({
	mangasInsert(data) {
		check(data, Object);
		return Mangas.upsert({
			name: data.name,
			number: data.number
		}, {
			$set: {
				title: data.title,
				user: data.user,
				name: data.name,
				author: data.author,
				number: data.number,
				isbn: data.isbn,
				cover: data.cover,
				releaseDate: data.releaseDate,
				owned: data.owned,
				editor: data.editor,
				version: data.version,
				genre: data.genre
			}
		});
	},
	setOwnedTrue(mangasId) {
		check(mangasId, String);
		return Mangas.update({
			'_id': mangasId
		}, {
			$set: {
				'owned': true
			}
		});
	},
	setOwnedFalse(mangasId) {
		check(mangasId, String);
		return Mangas.update({
			'_id': mangasId
		}, {
			$set: {
				'owned': false
			}
		});
	}
});
