import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Mangas = new Mongo.Collection('mangas');

Mangas.deny({
	insert() {
		return true;
	},
	update() {
		return true;
	},
	remove() {
		return true;
	}
});

export const mangasSchema = new SimpleSchema({
	tomeId: {
		type: String,
		label: 'Tome id of the mangaId in the MangasData collection'
	},
	mangaId: {
		type: String,
		label: 'Manga Id in the MangasData collection'
	},
	userId: {
		type: String,
		label: 'User'
	},
	owned: {
		type: Boolean,
		label: 'Owned'
	}
});

Mangas.schema = mangasSchema;
