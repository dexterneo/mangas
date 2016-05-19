import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { MangasData } from '../../../api/mangasData/schema.js';

import './admin.jade';
import '../../components/header/header.js';

Template.admin.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allMangasCoverForAdmin');
	});
});

Template.admin.helpers({
	isAdmin() {
		return Meteor.user().profile.admin;
	},
	series() {
		return MangasData.find({}, {
			sort: {
				'names.fr': 1
			},
			fields: {
				'names.fr': 1,
				cover: 1,
				tomes: 1
			}
		});
	},
	nbTomes() {
		return this.tomes.length;
	}
});
