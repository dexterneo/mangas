Template.editManga.helpers({});

Template.editManga.events({
	'click #mangaTitlesSave' (event) {
		event.preventDefault();
		const data = {
			mangaId: this._id,
			fr: $('#namesFr').val(),
			en: $('#namesEn').val(),
			jp: $('#namesJp').val()
		};
		if (data.fr || data.en || data.jp) {
			Meteor.call('updateMangaNames', data, (error, result) => {
				if (error) {
					return throwError(error.message);
				}
			});
		}
	},
	'click #mangaAuthorsSave' (event) {
		event.preventDefault();
		console.log(this);
	},
	'click #mangaCoverSave' (event) {
		event.preventDefault();
		console.log(this);
	},
	'click #mangaGenreSave' (event) {
		event.preventDefault();
		console.log(this);
	},
	'click .tomeSave' (event) {
		event.preventDefault();
		console.log(this);
	}
});
