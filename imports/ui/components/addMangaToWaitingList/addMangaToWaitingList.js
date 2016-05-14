import { Template } from 'meteor/templating';

import './addMangaToWaitingList.jade';

Template.addMangaToWaitingList.events({
	'click #addMangaToWaitingList': function() {
		const manga = {
			askedBy: Meteor.userId(),
			name: $('#mangasNameToAdd').val(),
			date: new Date()
		};

		Meteor.call('addToWaitingList', manga, (error, result) => {
			if (error) {
				return throwError(error.message);
			} else {
				$('#mangasNameToAdd').val('');
			}
		});
	}
});
