Template.header.helpers({
    homeActive: function() {
        if (Router.current().route._path === '/ownedMangas') {
            return 'active';
        } else {
            return false;
        }
    },
    missingActive: function() {
        if (Router.current().route._path === '/missingMangas') {
            return 'active';
        } else {
            return false;
        }
    }
});
