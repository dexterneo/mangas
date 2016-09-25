import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import 'meteor/sacha:spin';

import { Mangas } from '../../../api/mangas/schema.js';
import { MangasData } from '../../../api/mangasData/schema.js';

import './ownedMangas.jade';
import '../../components/buttonAddMangaForUser.jade';
import '../../components/tome/tome.js';
import '../../components/footer.jade';

Template.ownedMangas.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allOwnedMangas', Meteor.userId());
		this.subscribe('allMangasDataForUser', Meteor.userId(), true);
	});
});

Template.ownedMangas.helpers({
	tomesInMangatek() {
		return Mangas.findOne({ userId: Meteor.userId() });
	},
	mangasList() {
		return Mangas.find({
			userId: Meteor.userId(),
			owned: true
		});
	}
});
