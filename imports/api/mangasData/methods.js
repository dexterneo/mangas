import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Random } from 'meteor/random';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { MangasData, mangasDataSchema } from './schema.js';

Meteor.methods({
	addCompleteMangas(data) {
		check(data, mangasDataSchema);
		return MangasData.insert(data);
	},
	updateMangaNames(data) {
		let methodSchema = new SimpleSchema({
			mangaId: { type: String },
			fr: { type: String, optional: true },
			en: { type: String, optional: true },
			jp: { type: String, optional: true }
		});
		check(data, methodSchema);
		return MangasData.update({ _id: data.mangaId }, {
			$set: {
				'names.fr': data.fr,
				'names.en': data.en,
				'names.jp': data.jp
			}
		});
	},
	addATomeInAManga(data) {
		let methodSchema = new SimpleSchema({
			mangaId: { type: String },
			number: { type: Number, min: 1 }
		});
		check(data, methodSchema);
		return MangasData.update({ _id: data.mangaId }, {
			$push: {
				tomes: {
					tomeId: Random.id(),
					number: data.number
				}
			}
		});
	}
});
