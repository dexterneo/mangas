import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Mangas = new Mongo.Collection('mangas');

Mangas.deny({
	insert() { return true; },
	update() { return true; },
	remove() { return true; }
});

Mangas.schema = new SimpleSchema({
	tomeId: {
		type: String,
		label: 'Tome id of the mangaId in the MangasData collection'
	},
	mangaId: {
		type: String,
		label: 'Manga Id in the MangasData collection'
	},
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