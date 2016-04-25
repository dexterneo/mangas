Template.adminHome.helpers({
	isAdmin() {
		if (Meteor.user().profile.admin) {
			return true;
		} else {
			return false;
		}
	},
	series() {
		return MangasData.find({}, {
			sort: {
				'names.fr': 1
			},
			fields: {
				'names.fr': 1,
				cover: 1,
				tomes: 1
			}
		})
	},
	nbTomes() {
		return this.tomes.length;
	}
});
