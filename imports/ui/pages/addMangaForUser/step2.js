import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { Session } from 'meteor/session';
import { Bert } from 'meteor/themeteorchef:bert';
import 'meteor/sacha:spin';

import { MangasData } from '../../../api/mangasData/schema.js';
import { Mangas } from '../../../api/mangas/schema.js';

import './step2.jade';

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
		let tomeForUser = Mangas.findOne({
			tomeId: this.tomeId,
			userId: Meteor.userId()
		});
		if (tomeForUser && tomeForUser.owned) {
			return this.owned = true;
		} else {
			return this.owned = false;
		}
	}
});

Template.addMangaForUserStep2.events({
	'click .thumbnail': function(event) {
		event.preventDefault();
		this.owned = !this.owned;
		return $(event.target).parents('.thumbnail')
			.toggleClass('thumbnail-success')
			.find('button')
			.toggleClass('btn-default btn-success');
	},
	'click .ownThemAll': function(event) {
		event.preventDefault();
		if (Session.get('toggle') === 0) {
			$('.thumbnail').addClass('thumbnail-success');
			$('.addToCollection').removeClass('btn-default')
				.addClass('btn-success');
			Session.set('toggle', 1);
			this.tomes.map((cur, index, array) => {
				return cur.owned = true;
			});
		} else {
			$('.thumbnail').removeClass('thumbnail-success');
			$('.addToCollection').removeClass('btn-success')
				.addClass('btn-default');
			Session.set('toggle', 0);
			this.tomes.map((cur, index, array) => {
				return cur.owned = false;
			});
		}
		return $('.ownThemAll').toggleClass('btn-primary btn-warning');
	},
	'click .addTomes': function(event) {
		event.preventDefault();
		let manga = this;
		manga.tomes.map((cur, index, array) => {
			let data = {
				mangaId: manga._id,
				tomeId: cur.tomeId,
				userId: Meteor.userId(),
				owned: cur.owned
			};
			Meteor.call('mangasInsert', data, (error, result) => {
				if (error) {
					return Bert.alert(error.message, 'danger', 'growl-top-right');
				}
			});
		});
		Router.go('ownedMangas');
	}
});
