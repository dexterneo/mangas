MangasToAdd = new Mongo.Collection('mangasToAdd');

var Schemas = {};

Schemas.MangasToAdd = new SimpleSchema({
	askedBy: {
		type: [String],
		label: 'UserID list of people demanding this manga'
	},
	name: {
		type: String,
		label: 'Manga name'
	},
	date: {
		type: String,
		label: 'Date of the demand'
	}
});

MangasToAdd.attachSchema(Schemas.MangasToAdd);

Meteor.methods({
	addToWaitingList(manga) {
		let IsMangaAlreadyThere = MangasToAdd.findOne({
			name: manga.name
		});

		if (IsMangaAlreadyThere) {
			for (var i = 0; i < IsMangaAlreadyThere.askedBy.length; i++) {
				if (IsMangaAlreadyThere.askedBy[i] === manga.askedBy) {
					throw new Meteor.Error('Error 500: User already asked for this manga', 'You are already asking for this manga...  We are working on it, sorry for the delay...');
				}
			}
			return MangasToAdd.update({
				_id: IsMangaAlreadyThere._id
			}, {
				$push: {
					askedBy: manga.askedBy
				}
			});
		} else {
			return MangasToAdd.insert({
				askedBy: [manga.askedBy],
				name: manga.name,
				date: manga.date
			});
		}
	}
});
