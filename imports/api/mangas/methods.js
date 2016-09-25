import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Mangas, mangasSchema } from './schema.js';

Meteor.methods({
	mangasInsert(data) {
		check(data, mangasSchema);
		return Mangas.upsert({
			tomeId: data.tomeId,
			mangaId: data.mangaId
		}, {
			$set: {
				mangaId: data.mangaId,
				tomeId: data.tomeId,
				userId: data.userId,
				owned: data.owned
			}
		});
	},
	setOwnedTrue(data) {
		let methodSchema = new SimpleSchema({
			_id: { type: String },
		});
		check(data, methodSchema);
		return Mangas.update({ _id: data._id }, {
			$set: {
				owned: true
			}
		});
	},
	setOwnedFalse(data) {
		let methodSchema = new SimpleSchema({
			_id: { type: String },
		});
		check(data, methodSchema);
		return Mangas.update({ _id: data._id }, {
			$set: {
				owned: false
			}
		});
	}
});
