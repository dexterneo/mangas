MangasData = new Mongo.Collection('mangasData');

Meteor.methods({
	addCompleteMangas: function(serie) {
		return MangasData.insert(serie);
	}
});
