import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Random } from 'meteor/random';

import { MangasData } from './schema.js';

Meteor.methods({
	addCompleteMangas(data) {
		check(data, Object);
		return MangasData.insert(data);
	},
	updateMangaNames(data) {
		check(data, Object);
		check(data.mangaId, String);
		if (data.fr) {
			check(data.fr, String);
		}
		if (data.en) {
			check(data.en, String);
		}
		if (data.jp) {
			check(data.jp, String);
		}
		if (!data.fr && !data.en && !data.jp) {
			return false;
		}
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
