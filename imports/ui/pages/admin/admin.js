import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './admin.jade';
import '../../components/listMangasSeries/listMangasSeries.js';

Template.admin.helpers({
	isAdmin() {
		return Meteor.user().profile.admin;
	}
});

Template.listMangasSeries.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allMangasCoverForAdmin');
	});
});
