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
	},
	addCompleteMangasActive: function() {
		if (Router.current().route._path === '/admin/addCompleteMangas') {
			return 'active';
		} else {
			return false;
		}
	},
	admin: function() {
		if (Meteor.user().profile.isAdmin) {
			return true;
		} else {
			return false;
		}
	}
});
