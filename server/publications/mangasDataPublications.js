// Send back all mangas
Meteor.publish('allMangasCover', function() {
    return MangasData.find({}, {
        fields: {
            "cover": 1
        }
    });
});
