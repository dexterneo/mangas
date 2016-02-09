class AddMangaToWaitingList extends BlazeComponent {
	template() {
		return 'addMangaToWaitingList';
	}

	events() {
		return super.events().concat({
			'click #addMangaToWaitingList': this.addMangaToWaitingList
		});
	}

	addMangaToWaitingList() {
		var manga = {
			askBy: Meteor.userId(),
			name: $('#mangasNameToAdd').val(),
			date: new Date()
		};

		Meteor.call('addToWaitingList', manga, function(error, result) {
			if (error) {
				return throwError(error.message);
			} else {
				console.log(result);
				$('#mangasNameToAdd').val('');
			}
		});
	}
}

AddMangaToWaitingList.register('AddMangaToWaitingList');
