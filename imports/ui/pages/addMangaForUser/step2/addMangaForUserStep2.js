Template.addMangaForUserStep2.onRendered(() => {
	Session.set('toggle', 0);
	if (Meteor.userId() === null) {
		Router.go('home');
	}
});

Template.addMangaForUserStep2.helpers({
	manga() {
		let manga = MangasData.findOne({
			_id: Router.current().params._id
		});
		let tomes = Mangas.find({
			user: Meteor.userId(),
			name: manga.names.fr
		}, {
			sort: {
				number: 1
			}
		}).fetch();
		// Add tomes only if the user own tomes
		if (tomes.length !== 0) {
			for (var i = 0; i < manga.tomes.length; i++) {
				if (tomes[i].number === manga.tomes[i].number) {
					manga.tomes[i].owned = tomes[i].owned;
				}
			}
		}
		return manga;
	}
});

Template.addMangaForUserStep2.events({
	'click .grid-item': function(event) {
		event.preventDefault();
		return $(event.target).parents('.grid-item').find('button').toggleClass('btn-default btn-success');
	},
	'click .ownThemAll': function(event) {
		event.preventDefault();
		if (Session.get('toggle') === 0) {
			$('.addToCollection').removeClass('btn-default').addClass('btn-success');
			Session.set('toggle', 1);
		} else {
			$('.addToCollection').removeClass('btn-success').addClass('btn-default');
			Session.set('toggle', 0);
		}
		return $('.ownThemAll').toggleClass('btn-primary btn-warning');
	},
	'click .addTomes': function(event) {
		let manga = this;
		event.preventDefault();
		$('.mangas').each((index, element) => {
			if (index + 1 === manga.tomes[index].number) {
				let tomeData = manga.tomes[index];
				let tome = {
					title: tomeData.title || '',
					user: Meteor.userId(),
					name: manga.names.fr,
					author: getAuthors(manga.authors),
					number: tomeData.number,
					isbn: tomeData.isbn,
					cover: tomeData.cover,
					releaseDate: tomeData.releaseDate || '',
					genre: manga.genre,
					editor: tomeData.editor,
					version: tomeData.version
				};
				if ($(element).find('.addToCollection').hasClass('btn-success')) {
					tome.owned = true;
				} else {
					tome.owned = false;
				}
				Meteor.call('mangasInsert', tome, (error, result) => {
					if (error) {
						return throwError(error.message);
					}
				});
			}
		});
		Router.go('ownedMangas');
	}
});
