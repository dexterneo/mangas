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
		e.preventDefault();
		$('.mangas').each(function(index, element) {
			console.log(this);
			/*var mangas = {
				title: $('#title').val(),
				user: Meteor.userId(),
				mangasName: $('#mangasName').val(),
				author: $('#author').val(),
				tomeNumber: filterInt($('#tomeNumber').val()),
				isbn: $('#isbn').val(),
				cover: $('#cover').val(),
				releaseDate: $('#releaseDate').val(),
				owned: $('#owned').is(':checked'),
				genre: $('#genre').val(),
				editor: $('#editor').val(),
				version: $('#version').val()
			};
			Meteor.call('mangasInsert', mangas, function(error) {
				if (error) {
					return throwError(error.message);
				} else {
					$('#myModal').modal('hide');
				}
			});*/
		});
	}
});
