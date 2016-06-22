import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import 'meteor/sacha:spin';

import { MangasData } from '../../../api/mangasData/schema.js';

import './mangasCoverList.jade';
import '../cover/mangaCover.jade';

Template.mangasCoverList.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allMangasCover');
	});
});

Template.mangasCoverList.helpers({
	covers() {
		return MangasData.find({}, {
			sort: {
				'names.fr': 1
			},
			fields: {
				cover: 1
			}
		});
	}
});
