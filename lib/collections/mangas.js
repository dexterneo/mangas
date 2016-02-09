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
		label: "Genre",
		optional: true
	}
});

Mangas.attachSchema(Schemas.Mangas);

Meteor.methods({
	mangasInsert: function(tome) {
		return Mangas.upsert({
			name: tome.name,
			number: tome.number
		}, {
			$set: {
				title: tome.title,
				user: tome.user,
				name: tome.name,
				author: tome.author,
				number: tome.number,
				isbn: tome.isbn,
				cover: tome.cover,
				releaseDate: tome.releaseDate,
				owned: tome.owned,
				editor: tome.editor,
				version: tome.version,
				genre: tome.genre
			}
		});
	},
	setOwnedTrue: function(mangasId) {
		return Mangas.update({
			"_id": mangasId
		}, {
			$set: {
				"owned": true
			}
		});
	},
	setOwnedFalse: function(mangasId) {
		return Mangas.update({
			"_id": mangasId
		}, {
			$set: {
				"owned": false
			}
		});
	}
});
