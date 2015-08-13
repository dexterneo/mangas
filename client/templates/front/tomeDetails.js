Template.tomeDetails.helpers({
	mangaData: function() {
		return Mangas.find({
			"user": Meteor.userId(),
			"mangasName": this.params.mangasName,
			"tomeNumber": Number(this.params.tomeNumber)
		},{limit:1}).fetch()[0];
	}
});