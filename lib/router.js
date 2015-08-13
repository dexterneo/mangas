var subscriptions = new SubsManager();

Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});

Router.route('/', {
	name: 'home',
	waitOn: function() {
		return subscriptions.subscribe('allOwnedMangas', Meteor.userId());
	},
	fastRender: true
});

Router.route('/missingMangas', {
	name: 'missingMangas',
	waitOn: function() {
		return subscriptions.subscribe('allMissingMangas', Meteor.userId());
	}
});

Router.route('/tome/:_id', {
	name: 'tomeDetails',
	waitOn: function() {
		return subscriptions.subscribe('tomeDetails', this.params._id);
	},
	data: function() {
		return Mangas.findOne(this.params._id);
	}
});
