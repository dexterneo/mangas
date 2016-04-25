Template.addMangaForUserStep1.events({
	'click .mangas-cover': function() {
		return Router.go('addMangaForUserStep2', {
			_id: this._id
		});
	}
});
