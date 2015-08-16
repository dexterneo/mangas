Template.tomeDetails.helpers({
	displayDate: function() {
		return moment(this.releaseDate, "YYYY/MM/DD").fromNow();
	},
	notOwned: function() {
		return !this.owned;
	}
});

Template.tomeDetails.events({
	'click #setOwnedTrue': function() {
		Meteor.call('setOwnedTrue', this._id, function(error) {
			if (error) {
				return throwError(error.message);
			}
		});
	},
	'click #setOwnedFalse': function() {
		Meteor.call('setOwnedFalse', this._id, function(error) {
			if (error) {
				return throwError(error.message);
			}
		});
	}
});
