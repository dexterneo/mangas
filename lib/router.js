var subscriptions = new SubsManager();

Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

Router.route('/', {
    name: 'home',
    waitOn: function() {
        return subscriptions.subscribe('allMangasCover');
    },
    fastRender: true
});

Router.route('/ownedMangas', {
    name: 'ownedMangas',
    waitOn: function() {
        return subscriptions.subscribe('allOwnedMangas', Meteor.userId());
    }
});

Router.route('/missingMangas', {
    name: 'missingMangas',
    waitOn: function() {
        return subscriptions.subscribe('allMissingMangas', Meteor.userId());
    }
});

Router.route('/:mangasName/tome/:tomeNumber/:_id', {
    name: 'tomeDetails',
    waitOn: function() {
        return [subscriptions.subscribe('tomeDetails', this.params._id), subscriptions.subscribe('allTomes', Meteor.userId(), this.params.mangasName)];
    },
    data: function() {
        return Mangas.findOne(this.params._id);
    }
});

Router.route('/:author', {
    name: 'mangaka',
    waitOn: function() {
        return subscriptions.subscribe('mangaka', Meteor.userId(), this.params.author);
    }
});

Router.route('/admin/addCompleteMangas', {
    name: 'addCompleteMangas'
});
