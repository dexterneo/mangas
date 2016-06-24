import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const MangasData = new Mongo.Collection('mangasData');

MangasData.deny({
	insert() {
		return true; },
	update() {
		return true; },
	remove() {
		return true; }
});

let NamesSchema = new SimpleSchema({
	fr: {
		type: String,
		label: 'French manga name'
	},
	jp: {
		type: String,
		label: 'Japanese manga name',
		optional: true
	},
	en: {
		type: String,
		label: 'English manga name',
		optional: true
	}
});

let AuthorsSchema = new SimpleSchema({
	firstName: {
		type: String,
		label: 'First name of the author',
		optional: true
	},
	lastName: {
		type: String,
		label: 'Last name of the author'
	},
	photo: {
		type: String,
		label: 'Url of the authro picture',
		regEx: SimpleSchema.RegEx.Url,
		optional: true
	}
});

let TomeSchema = new SimpleSchema({
	tomeId: {
		type: String,
		label: 'Tome id'
	},
	title: {
		type: String,
		label: 'Title',
		optional: true
	},
	releaseDate: {
		type: String,
		label: 'Release date of the manga tome',
		optional: true,
		defaultValue: '1900/01/01'
	},
	number: {
		type: Number,
		label: 'N° tome',
		min: 1
	},
	version: {
		type: String,
		label: 'Version of the manga tome',
		optional: true
	},
	isbn: {
		type: String,
		label: 'ISBN or Barcode',
		optional: true
	},
	cover: {
		type: String,
		label: 'Cover url of the manga tome',
		regEx: SimpleSchema.RegEx.Url,
		optional: true
	},
	editor: {
		type: String,
		label: 'Editor',
		optional: true
	}
});

MangasData.schema = new SimpleSchema({
	names: {
		type: NamesSchema
	},
	authors: {
		type: [AuthorsSchema],
		minCount: 1
	},
	cover: {
		type: String,
		label: 'Cover url of the manga',
		regEx: SimpleSchema.RegEx.Url
	},
	genre: {
		type: String,
		label: 'Genre',
		optional: true
	},
	tomes: {
		type: [TomeSchema],
		minCount: 1
	}
});
