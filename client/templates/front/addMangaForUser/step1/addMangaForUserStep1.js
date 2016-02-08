Template.addMangaForUserStep1.helpers({
	covers: function() {
		return MangasData.find({}, {
			sort: {
				"names.fr": 1
			},
			fields: {
				"cover": 1
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

Template.addMangaForUserStep1.events({
	'click .mangas-cover': function(e, t) {
		return Router.go('addMangaForUserStep2', {
			_id: this._id
		});
	}
});
