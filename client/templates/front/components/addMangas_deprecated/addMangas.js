Template.addMangas.helpers({
	editorList: function() {
		var list = _.uniq(Mangas.find({}, {
			sort: {
				"editor": 1
			},
			fields: {
				"editor": 1
			}
		}).fetch().map(function(x) {
			return x.editor;
		}), true);
		for (var i = 0; i < list.length; i++) {
			var j = list.shift();
			list.push({
				editor: j
			});
		}
		return list;
	},
	versionList: function() {
		var list = _.uniq(Mangas.find({}, {
			sort: {
				"version": 1
			},
			fields: {
				"version": 1
			}
		}).fetch().map(function(x) {
			return x.version;
		}), true);
		for (var i = 0; i < list.length; i++) {
			var j = list.shift();
			list.push({
				version: j
			});
		}
		return list;
	},
	mangasList: function() {
		var list = _.uniq(Mangas.find({}, {
			sort: {
				"mangasName": 1
			},
			fields: {
				"mangasName": 1
			}
		}).fetch().map(function(x) {
			return x.mangasName;
		}), true);
		for (var i = 0; i < list.length; i++) {
			var j = list.shift();
			list.push({
				mangasName: j
			});
		}
		return list;
	},
	authorList: function() {
		var list = _.uniq(Mangas.find({}, {
			sort: {
				"author": 1
			},
			fields: {
				"author": 1
			}
		}).fetch().map(function(x) {
			return x.author;
		}), true);
		for (var i = 0; i < list.length; i++) {
			var j = list.shift();
			list.push({
				author: j
			});
		}
		return list;
	},
	genreList: function() {
		var list = _.uniq(Mangas.find({}, {
			sort: {
				"genre": 1
			},
			fields: {
				"genre": 1
			}
		}).fetch().map(function(x) {
			return x.genre;
		}), true);
		for (var i = 0; i < list.length; i++) {
			var j = list.shift();
			list.push({
				genre: j
			});
		}
		return list;
	}
});

Template.addMangas.events({
	'click #addMangasInDB': function(e, t) {
		var mangas = {
			title: $('#title').val(),
			user: Meteor.userId(),
			name: $('#mangasName').val(),
			author: $('#author').val(),
			number: filterInt($('#tomeNumber').val()),
			isbn: $('#isbn').val(),
			cover: $('#cover').val(),
			releaseDate: $('#releaseDate').val(),
			owned: $('#owned').is(':checked'),
			genre: $('#genre').val(),
			editor: $('#editor').val(),
			version: $('#version').val()
		};

		Meteor.call('mangasInsert', mangas, function(error) {
			if (error) {
				return throwError(error.message);
			} else {
				$('#myModal').modal('hide');
			}
		});
	}
});
