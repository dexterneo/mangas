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
