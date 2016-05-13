Template.tomeDetails.helpers({
	displayDate() {
		return moment(this.releaseDate, 'YYYY/MM/DD').fromNow();
	},
	notOwned() {
		return !this.owned;
	},
	allTomesOwned() {
		return Mangas.find({
			user: Meteor.userId(),
			name: this.name,
			owned: true
		}, {
			sort: {
				'number': 1
			}
		});
	},
	allTomesMissing() {
		return Mangas.find({
			user: Meteor.userId(),
			name: this.name,
			owned: false
		}, {
			sort: {
				'number': 1
			}
		});
	},
	missingTome() {
		var a = Mangas.findOne({
			user: Meteor.userId(),
			name: this.name,
			owned: false
		});
		if (a) {
			return true;
		} else {
			return false;
		}
	},
	ownedTome() {
		var a = Mangas.findOne({
			user: Meteor.userId(),
			name: this.name,
			owned: true
		});
		if (a) {
			return true;
		} else {
			return false;
		}
	}
});

Template.tomeDetails.events({
	'click #setOwnedTrue': function() {
		Meteor.call('setOwnedTrue', this._id, (error, result) => {
			if (error) {
				return throwError(error.message);
			}
		});
	},
	'click #setOwnedFalse': function() {
		Meteor.call('setOwnedFalse', this._id, (error, result) => {
			if (error) {
				return throwError(error.message);
			}
		});
	}
});
