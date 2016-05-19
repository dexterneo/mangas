import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';
import { Router } from 'meteor/iron:router';

import './step1.jade';

import '../../components/mangasCoverList/mangasCoverList.js';
import '../../components/header/header.js';

Template.mangasCoverList.onCreated(function() {
	this.autorun(() => {
		this.subscribe('allMangasCover');
	});
});

Template.addMangaForUserStep1.events({
	'click .mangas-cover': function(event) {
		return Router.go('addMangaForUserStep2', {
			_id: this._id
		});
	}
});
