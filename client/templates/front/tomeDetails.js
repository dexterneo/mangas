Template.tomeDetails.helpers({
	displayDate: function() {
		return moment(this.releaseDate, "YYYY/MM/DD").fromNow();
	},
	notOwned: function() {
		return !this.owned;
	}
});