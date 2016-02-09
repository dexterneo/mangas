MangasToAdd = new Mongo.Collection('mangasToAdd');

var Schemas = {};

Schemas.MangasToAdd = new SimpleSchema({
	askBy: {
		type: [String],
		label: 'UserID list of people demanding this manga',
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
	addToWaitingList: function(manga) {
		var IsMangaAlreadyThere = MangasToAdd.findOne({
			name: manga.name
		});

		if (IsMangaAlreadyThere) {
			for (var i = 0; i < IsMangaAlreadyThere.askBy.length; i++) {
				if (IsMangaAlreadyThere.askBy[i] === manga.askBy) {
					throw new Meteor.Error('Error 500: User already asked for this manga', 'You are already asking for this manga...  We are working on it, sorry for the delay...');
				}
			}
			return MangasToAdd.update({
				_id: IsMangaAlreadyThere._id
			}, {
				$push: {
					askBy: manga.askBy
				}
			});
		} else {
			return MangasToAdd.insert({
				askBy: [manga.askBy],
				name: manga.name,
				date: manga.date
			});
		}
	}
});
