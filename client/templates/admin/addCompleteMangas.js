Template.addCompleteMangas.events({
	'click #addTome': function(e, t) {
		return Blaze.render(Template.addTome, t.$('.tomes').get(0));
	},
	'click #addManga': function() {
		var manga = {
			names: {
				fr: $('#mangasName').val()
			},
			authors: [{
				firstName: $('#authorFirstName').val(),
				lastName: $('#authorLastName').val(),
				photo: isValidUrl($('#authorCover').val())
			}],
			cover: isValidUrl($('#mangasCover').val()),
			genre: $('#genre').val(),
			tomes: []
		};
		$('.tome').each(function(index, element) {
			var tome = {
				title: isFilled($(element).find('.title')),
				releaseDate: isFilled($(element).find('.releaseDate')),
				number: filterInt($(element).find('.tomeNumber').val()),
				version: isFilled($(element).find('.version')),
				isbn: isFilled($(element).find('.isbn')),
				cover: isValidUrl($('.cover').val()),
				editor: isFilled($(element).find('.editor'))
			};
			manga.tomes.push(tome);
		});
		Meteor.call('addCompleteMangas', manga, function(error) {
			if (error) {
				return throwError(error.message);
			} else {
				Router.go('home');
			}
		});
	}
});
