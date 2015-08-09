Mangas = new Mongo.Collection('mangas');

Meteor.methods({
	mangasInsert: function(mangas) {
		return Mangas.insert(mangas);
	}
});
