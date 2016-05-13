getUserLanguage = function() {
	// Put here the logic for determining the user language
	return 'fr';
};

if (Meteor.isClient) {
	Meteor.startup(() => {
		TAPi18n.setLanguage(getUserLanguage()).fail((error_message) => {
			return throwError(error_message);
		});
	});
}
