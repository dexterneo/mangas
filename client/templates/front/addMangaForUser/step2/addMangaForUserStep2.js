Template.addMangaForUserStep2.helpers({
	manga: function() {
		return MangasData.findOne({
			'_id': Router.current().params._id
		});
	}
});

Template.addMangaForUserStep2.events({
	"click .grid-item": function(e, t) {
		e.preventDefault();
		return $(e.target).parents(".grid-item").find("button").toggleClass("btn-default btn-success");
	},
	"click .ownThemAll": function(e, t) {
		e.preventDefault();
		$(".ownThemAll").toggleClass("btn-primary btn-warning");
		return $(".addToCollection").toggleClass("btn-default btn-success");
	},
	"click .addTomes": function(e, t) {
		var manga = this;
		e.preventDefault();
		$('.mangas').each(function(index, element) {
			if (index + 1 === manga.tomes[index].number) {
				var tomeData = manga.tomes[index];
				var tome = {
					title: tomeData.title || "",
					user: Meteor.userId(),
					name: manga.names.fr,
					author: getAuthors(manga.authors),
					number: tomeData.number,
					isbn: tomeData.isbn,
					cover: tomeData.cover,
					releaseDate: tomeData.releaseDate || "",
					genre: manga.genre,
					editor: tomeData.editor,
					version: tomeData.version
				};
				if ($(element).find(".addToCollection").hasClass('btn-success')) {
					tome.owned = true;
				} else {
					tome.owned = false;
				}
				Meteor.call('mangasInsert', tome, function(error) {
					if (error) {
						return throwError(error.message);
					}
				});
			}
		});
		Router.go("ownedMangas");
	}
});
