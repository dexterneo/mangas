import { Router } from 'meteor/iron:router';

// Base components/layouts
import '../../ui/layouts/layout.js';
import '../../ui/components/notFound.jade';

// Pages
import '../../ui/pages/home/home.js';
import '../../ui/pages/addMangaForUser/step1.js';
import '../../ui/pages/addMangaForUser/step2.js';
import '../../ui/pages/ownedMangas/ownedMangas.js';
import '../../ui/pages/missingMangas/missingMangas.js';
import '../../ui/pages/tomeDetails/tomeDetails.js';
import '../../ui/pages/mangaka/mangaka.js';
import '../../ui/pages/admin/admin.js';
import '../../ui/pages/editManga/editManga.js';

Router.configure({
	layoutTemplate: 'layout',
	notFoundTemplate: 'notFound'
});

Router.route('/admin', {
	name: 'admin'
});

Router.route('/admin/editManga/:_id', {
	name: 'editManga'
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
	name: 'tomeDetails'
});

Router.route('/:author', {
	name: 'mangaka'
});
