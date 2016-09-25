import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import 'meteor/sacha:spin';

import { Mangas } from '../../../api/mangas/schema.js';

import './missingMangas.jade';
import '../../components/buttonAddMangaForUser.jade';
import '../../components/tome/tome.js';

Template.missingMangas.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allMissingMangas', Meteor.userId());
		this.subscribe('allMangasDataForUser', Meteor.userId(), false);
	});
});

Template.missingMangas.helpers({
	tomesInMangatek() {
		return Mangas.findOne({ userId: Meteor.userId() });
	},
	mangasList() {
		return Mangas.find({
			userId: Meteor.userId(),
			owned: false
		});
	}
});
