Mangas = new Mongo.Collection('mangas');

Meteor.methods({
	mangasInsert: function(mangas) {
		return Mangas.insert(mangas);
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
