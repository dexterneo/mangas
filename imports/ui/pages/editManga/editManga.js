import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { Bert } from 'meteor/themeteorchef:bert';
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
	},
	mangaTomes() {
		return this.tomes.sort((a, b) => {
			if (a.number < b.number) {
				return -1
			} else if (a.number > b.number) {
				return 1
			} else if (a.number === b.number) {
				return 0;
			}
		});
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
					return Bert.alert(error.message, 'danger', 'growl-top-right');
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
	},
	'click #addATome': function(event) {
		event.preventDefault();
		const data = {
			mangaId: Router.current().params._id,
			number: this.tomes.length
		};
		console.log(data);
		Meteor.call('addATomeInAManga', data, (error, result) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	}
});
