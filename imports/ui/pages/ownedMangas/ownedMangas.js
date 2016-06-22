import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import 'meteor/sacha:spin';

import { Mangas } from '../../../api/mangas/schema.js';

import './ownedMangas.jade';
import '../../components/buttonAddMangaForUser.jade';
import '../../components/mangas.jade';

Template.ownedMangas.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allOwnedMangas', Meteor.userId());
	});
});

Template.ownedMangas.helpers({
	tomesInMangatek() {
		return Mangas.findOne({ user: Meteor.userId() });
	},
	mangasList() {
		return Mangas.find({
			user: Meteor.userId(),
			owned: true
		}, {
			sort: {
				number: 1,
				name: 1
			},
			fields: {
				cover: 1,
				name: 1,
				number: 1,
				owned: 1
			}
		});
	}
});
