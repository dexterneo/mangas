import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Mangas } from '../../../api/mangas/schema.js';

import './missingMangas.jade';
import '../../components/buttonAddMangaForUser.jade';
import '../../components/mangas.jade';
import '../../components/header/header.js';

Template.ownedMangas.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allMissingMangas', Meteor.userId());
	});
});

Template.missingMangas.helpers({
	tomesInMangatek() {
		return Mangas.findOne({user: Meteor.userId()});
	},
	mangasList() {
		return Mangas.find({
			user: Meteor.userId(),
			owned: false
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
