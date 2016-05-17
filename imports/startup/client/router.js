import { Router } from 'meteor/iron:router';
import { loading } from 'meteor/sacha:spin';

// Base components/layouts
import '../../ui/layouts/layout.jade';
import '../../ui/components/loading.jade';
import '../../ui/components/notFound.jade';

// Pages
import '../../ui/pages/home/home.js';
import '../../ui/pages/addMangaForUser/step1.js';
import '../../ui/pages/addMangaForUser/step2.js';
import '../../ui/pages/ownedMangas/ownedMangas.js';
import '../../ui/pages/missingMangas/missingMangas.js';

let subscriptions = new SubsManager();

Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});

Router.route('/admin', {
	name: 'adminHome',
	waitOn() {
		return subscriptions.subscribe('allMangasCoverForAdmin');
	}
});

Router.route('/admin/editManga/:_id', {
	name: 'editManga',
	waitOn() {
		return subscriptions.subscribe('oneMangasData', this.params._id);
	},
	data() {
		return MangasData.findOne(this.params._id);
	}
});

Router.route('/admin/addCompleteMangas', {
	name: 'addCompleteMangas'
});

Router.route('/admin/viewMangasToAdd', {
	name: 'viewMangasToAdd'
});

Router.route('/', {
	name: 'home'
});

Router.route('/addMangaForUser/step1', {
	name: 'addMangaForUserStep1'
});

Router.route('/addMangaForUser/step2/:_id', {
	name: 'addMangaForUserStep2'
});

Router.route('/ownedMangas', {
	name: 'ownedMangas'
});

Router.route('/missingMangas', {
	name: 'missingMangas'
});

Router.route('/:name/tome/:number/:_id', {
	name: 'tomeDetails',
	waitOn() {
		return [
			subscriptions.subscribe('tomeDetails', this.params._id),
			subscriptions.subscribe('allTomes', Meteor.userId(), this.params.name)
		];
	},
	data() {
		return Mangas.findOne(this.params._id);
	}
});

Router.route('/:author', {
	name: 'mangaka',
	waitOn() {
		return subscriptions.subscribe('mangaka', this.params.author);
	}
});
