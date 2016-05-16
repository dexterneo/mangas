Meteor.methods({
	addCompleteMangas(data) {
		check(data, Object);
		return MangasData.insert(data);
	},
	updateMangaNames(data) {
		check(data, Object);
		check(data.mangaId, String);
		if (data.fr) {
			check(data.fr, String);
		}
		if (data.en) {
			check(data.en, String);
		}
		if (data.jp) {
			check(data.jp, String);
		}
		if (!data.fr && !data.en && !data.jp) {
			return false;
		}
		return MangasData.update({ _id: data.mangaId },{
			$set: {
				'names.fr': data.fr,
				'names.en': data.en,
				'names.jp': data.jp
			}
		});
	}
});
