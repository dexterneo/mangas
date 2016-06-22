import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Router } from 'meteor/iron:router';
import { Blaze } from 'meteor/blaze';

import './addCompleteMangas.jade';

Template.addCompleteMangas.events({
	'click #addTome': function(e, t) {
		return Blaze.render(Template.addTome, t.$('.tomes').get(0));
	},
	'click #addManga': function() {
		var manga = {
			names: {
				fr: $('#namesFr').val()
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
				title: $(element).find('.title').val(),
				releaseDate: $(element).find('.releaseDate').val(),
				number: filterInt($(element).find('.tomeNumber').val()),
				version: $(element).find('.version').val(),
				isbn: $(element).find('.isbn').val(),
				cover: isValidUrl($('.cover').val()),
				editor: $(element).find('.editor').val()
			};
			manga.tomes.push(tome);
		});
		Meteor.call('addCompleteMangas', manga, function(error) {
			if (error) {
				return error.message;
			} else {
				Router.go('home');
			}
		});
	}
});
