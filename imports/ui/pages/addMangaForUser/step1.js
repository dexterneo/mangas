import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';

import './step1.jade';

import '../../components/mangasCoverList/mangasCoverList.js';

Template.addMangaForUserStep1.events({
	'click .mangas-cover': function(event) {
		return Router.go('addMangaForUserStep2', {
			_id: this._id
		});
	}
});
