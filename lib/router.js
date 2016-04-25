var subscriptions = new SubsManager();

Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});

Router.route('/admin', {
	name: 'adminHome'
});

Router.route('/admin/addCompleteMangas', {
	name: 'addCompleteMangas'
});

Router.route('/admin/viewMangasToAdd', {
	name: 'viewMangasToAdd'
});

Router.route('/', {
	name: 'home',
	waitOn() {
		return subscriptions.subscribe('allMangasCover');
	},
	fastRender: true
});

Router.route('/addMangaForUser/step1', {
	name: 'addMangaForUserStep1',
	waitOn() {
		return subscriptions.subscribe('allMangasCover');
	}
});

Router.route('/addMangaForUser/step2/:_id', {
	name: 'addMangaForUserStep2',
	waitOn() {
		return [
			subscriptions.subscribe('oneMangasData', this.params._id),
			subscriptions.subscribe('allTomesForUser', Meteor.userId())
		];
	}
});

Router.route('/ownedMangas', {
	name: 'ownedMangas',
	waitOn() {
		return subscriptions.subscribe('allOwnedMangas', Meteor.userId());
	}
});

Router.route('/missingMangas', {
	name: 'missingMangas',
	waitOn() {
		return subscriptions.subscribe('allMissingMangas', Meteor.userId());
	}
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
