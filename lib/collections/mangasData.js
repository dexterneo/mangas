MangasData = new Mongo.Collection('mangasData');

var Schemas = {};

NamesSchema = new SimpleSchema({
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

AuthorsSchema = new SimpleSchema({
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

TomeSchema = new SimpleSchema({
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
		label: 'Version of the manga tome'
	},
	isbn: {
		type: String,
		label: 'ISBN or Barcode',
		unique: true
	},
	cover: {
		type: String,
		label: 'Cover url of the manga tome',
		regEx: SimpleSchema.RegEx.Url
	},
	editor: {
		type: String,
		label: 'Editor'
	}
});

Schemas.MangasData = new SimpleSchema({
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

MangasData.attachSchema(Schemas.MangasData);

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
		return MangasData.update({ _id: data.mangaId },{
			$set: {
				'names.fr': data.fr,
				'names.en': data.en,
				'names.jp': data.jp
			}
		});
	}
});
