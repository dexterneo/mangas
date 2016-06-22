import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import 'meteor/sacha:spin';

import { MangasData } from '../../../api/mangasData/schema.js';

import './mangaka.jade';

Template.mangaka.onCreated(function() {
	this.autorun(() => {
		this.subscribe('mangaka', Router.current().params.author);
	});
});

Template.mangaka.helpers({
	author() {
		return Router.current().params.author;
	},
	serie() {
		let newAuthor = Router.current().params.author.split(' ');
		return MangasData.find({
			'authors.firstName': newAuthor[0],
			'authors.lastName': newAuthor[1]
		}, {
			sort: {
				'names.fr': 1,
				tomes: 1
			}
		});
	},
	mangaName() {
		return Template.parentData().names.fr;
	},
	tome1() {
		return this.tomes.sort((a, b) => {
			if (a.number < b.number) {
				return -1;
			} else if (a.number > b.number) {
				return 1;
			} else {
				return 0;
			}
		})[0];
	}
});
