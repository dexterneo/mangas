// Send back all owned mangas
Meteor.publish('allOwnedMangas', function(userId) {
    return Mangas.find({
        "user": userId,
        "owned": true
    });
});

// Send back all missing mangas
Meteor.publish('allMissingMangas', function(userId) {
    return Mangas.find({
        "user": userId,
        "owned": false
    });
});

// Send back the data about a tome
Meteor.publish('tomeDetails', function(id) {
    return Mangas.find({
        "_id": id
    });
});

Meteor.publish('allTomes', function(userId, mangasName) {
    return Mangas.find({
        "user": userId,
        "mangasName": mangasName
    });
});

Meteor.publish('mangaka', function(userId, author) {
    return Mangas.find({
        "user": userId,
        "author": author,
        "tomeNumber": 1
    });
});
