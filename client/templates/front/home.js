Template.home.helpers({
	covers: function() {
		return MangasData.find({}, {
			sort: {
				"names.fr": 1
			}
		});
	},
	ifLogIn: function() {
		if (Meteor.userId()) {
			return true;
		} else {
			return false;
		}
	}
});

Template.home.events({
	'click #addMangaToWaitingList': function() {
		return true;
	}
});
