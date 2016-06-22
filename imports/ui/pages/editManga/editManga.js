import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import 'meteor/sacha:spin';

import { MangasData } from '../../../api/mangasData/schema.js';

import './editManga.jade';

Template.editManga.onCreated(function() {
	this.autorun(() => {
		this.subscribe('oneMangasData', Router.current().params._id);
	});
});

Template.editManga.helpers({
	mangaData() {
		return MangasData.findOne({ _id: Router.current().params._id });
	}
});

Template.editManga.events({
	'click #mangaTitlesSave': function(event) {
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
					return error.message;
				}
			});
		}
	},
	'click #mangaAuthorsSave': function(event) {
		event.preventDefault();
	},
	'click #mangaCoverSave': function(event) {
		event.preventDefault();
	},
	'click #mangaGenreSave': function(event) {
		event.preventDefault();
	},
	'click .tomeSave': function(event) {
		event.preventDefault();
	}
});
