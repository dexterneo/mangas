import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';
import { Router } from 'meteor/iron:router';
import { Session } from 'meteor/session';

import { MangasData } from '../../../api/mangasData/schema.js';
import { Mangas } from '../../../api/mangas/schema.js';
import { getAuthors } from '../../../startup/client/lib/sharedFunctions.js';

import './step2.jade';
import '../../components/header/header.js';

Template.addMangaForUserStep2.onCreated(function() {
	this.autorun(() => {
		this.subscribe('oneMangasData', Router.current().params._id);
		this.subscribe('allTomesForUser', Router.current().params._id, Meteor.userId());
	});
});

Template.addMangaForUserStep2.onRendered(() => {
	Session.set('toggle', 0);
	if (Meteor.userId() === null) {
		Router.go('home');
	}
});

Template.addMangaForUserStep2.helpers({
	manga() {
		return MangasData.findOne({
			_id: Router.current().params._id
		});
	},
	ownedByUser() {
		let tomeForUser = Mangas.findOne({ tomeId: this.tomeId, user: Meteor.userId() });
		if (tomeForUser && tomeForUser.owned) {
			return this.owned = true;
		} else {
			return this.owned = false;
		}
	}
});

Template.addMangaForUserStep2.events({
	'click .grid-item': function(event) {
		event.preventDefault();
		this.owned = !this.owned;
		return $(event.target).parents('.grid-item').find('button').toggleClass('btn-default btn-success');
	},
	'click .ownThemAll': function(event) {
		event.preventDefault();
		if (Session.get('toggle') === 0) {
			$('.addToCollection').removeClass('btn-default').addClass('btn-success');
			Session.set('toggle', 1);
			this.tomes.map((cur, index, array) => {
				cur.owned = true;
			});
		} else {
			$('.addToCollection').removeClass('btn-success').addClass('btn-default');
			Session.set('toggle', 0);
			this.tomes.map((cur, index, array) => {
				cur.owned = false;
			});
		}
		return $('.ownThemAll').toggleClass('btn-primary btn-warning');
	},
	'click .addTomes': function(event) {
		event.preventDefault();
		let manga = this;
		manga.tomes.map((cur, index, array) => {
			let tome = {
				mangaId: manga._id,
				tomeId: cur.tomeId,
				title: cur.title,
				user: Meteor.userId(),
				name: manga.names.fr,
				author: getAuthors(manga.authors),
				number: cur.number,
				isbn: cur.isbn,
				cover: cur.cover,
				releaseDate: cur.releaseDate,
				owned: cur.owned,
				editor: cur.editor,
				version: cur.version,
				genre: manga.genre
			};
			Meteor.call('mangasInsert', tome, (error, result) => {
				if (error) {
					return error.message;
				}
			});
		});
		/*$('.mangas').each((index, element) => {
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
		});*/
		Router.go('ownedMangas');
	}
});
