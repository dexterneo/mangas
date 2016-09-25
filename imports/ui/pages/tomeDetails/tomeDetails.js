import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';
import { Bert } from 'meteor/themeteorchef:bert';
import 'meteor/sacha:spin';

import { Mangas } from '../../../api/mangas/schema.js';
import { MangasData } from '../../../api/mangasData/schema.js';
import { getAuthors } from '../../../startup/client/lib/sharedFunctions.js';

import './tomeDetails.jade';
import '../../components/cover/cover.jade';

Template.tomeDetails.onCreated(function() {
	this.autorun(() => {
		this.subscribe('tomeDetails', Meteor.userId(), Router.current().params.mangaId);
		this.subscribe('oneMangasData', Router.current().params.mangaId);
	});
});


Template.tomeDetails.helpers({
	mangasData() {
		return MangasData.findOne({ _id: Router.current().params.mangaId });
	},
	tomeData() {
		let data = this.tomes.filter((cur, index, array) => {
			return cur.tomeId === Router.current().params.tomeId;
		});
		return data[0];
	},
	author() {
		return getAuthors(this.authors);
	},
	displayDate() {
		return moment(this.releaseDate, 'YYYY/MM/DD').fromNow();
	},
	owned() {
		return Mangas.findOne({
			userId: Meteor.userId(),
			tomeId: Router.current().params.tomeId
		}, {
			fields: {
				owned: 1
			}
		}).owned;
	},
	allTomesOwned() {
		return Mangas.find({
			user: Meteor.userId(),
			name: this.name,
			owned: true
		}, {
			sort: {
				'number': 1
			}
		});
	},
	allTomesMissing() {
		return Mangas.find({
			user: Meteor.userId(),
			name: this.name,
			owned: false
		}, {
			sort: {
				'number': 1
			}
		});
	},
	missingTome() {
		var a = Mangas.findOne({
			user: Meteor.userId(),
			name: this.name,
			owned: false
		});
		if (a) {
			return true;
		} else {
			return false;
		}
	},
	ownedTome() {
		var a = Mangas.findOne({
			user: Meteor.userId(),
			name: this.name,
			owned: true
		});
		if (a) {
			return true;
		} else {
			return false;
		}
	}
});

Template.tomeDetails.events({
	'click #setOwnedTrue': function() {
		let data = Mangas.findOne({
			userId: Meteor.userId(),
			tomeId: Router.current().params.tomeId
		}, {
			fields: {
				_id: 1
			}
		});
		Meteor.call('setOwnedTrue', data, (error, result) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	},
	'click #setOwnedFalse': function() {
		let data = Mangas.findOne({
			userId: Meteor.userId(),
			tomeId: Router.current().params.tomeId
		}, {
			fields: {
				_id: 1
			}
		});
		Meteor.call('setOwnedFalse', data, (error, result) => {
			if (error) {
				return Bert.alert(error.message, 'danger', 'growl-top-right');
			}
		});
	}
});
