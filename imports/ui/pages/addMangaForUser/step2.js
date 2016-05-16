import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';
import { Router } from 'meteor/iron:router';
import { Session } from 'meteor/session';

import { MangasData } from '../../../api/mangasData/schema.js';
import { Mangas } from '../../../api/mangas/schema.js';
import { getAuthors } from '../../../startup/client/lib/sharedFunctions.js';

import './step2.jade';

Template.addMangaForUserStep2.onCreated(function() {
	this.autorun(() => {
		this.subscribe('oneMangasData', Router.current().params._id);
		this.subscribe('allTomesForUser', Meteor.userId());
	});
});

Template.addMangaForUserStep2.onRendered(() => {
	Session.set('toggle', 0);
	if (Meteor.userId() === null) {
		Router.go('home');
	}
});

Template.addMangaForUserStep2.helpers({
	dataForTheManga() {
		return MangasData.findOne({
			_id: Router.current().params._id
		});
	},
	tomesOwnedByUser() {
		let mangasDataTomes = this.tomes;
		let tomes = Mangas.find({
			user: Meteor.userId(),
			name: this.names.fr
		}, {
			sort: {
				number: 1
			}
		}).fetch();
		// Add tomes only if the user own tomes
		mangasDataTomes.sort((a, b) => {
			if (a.number < b.number) {
				return -1;
			} else if (a.number > b.number) {
				return 1;
			} else {
				return 0;
			}
		});
		if (tomes.length !== 0) {
			mangasDataTomes.map((cur, index, array) => {
				if (tomes[index].number === cur.number) {
					cur.owned = tomes[index].owned;
				}
			});
		} else {
			mangasDataTomes.map((cur, index, array) => {
				cur.owned = false;
			});
		}
		console.log(mangasDataTomes, tomes);
		return mangasDataTomes;
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
