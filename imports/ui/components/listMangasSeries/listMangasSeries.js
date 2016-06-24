import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import 'meteor/sacha:spin';

import { MangasData } from '../../../api/mangasData/schema.js';

import './listMangasSeries.jade';

Template.listMangasSeries.helpers({
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
