Template.tomeDetails.helpers({
    displayDate: function() {
        return moment(this.releaseDate, "YYYY/MM/DD").fromNow();
    },
    notOwned: function() {
        return !this.owned;
    },
    allTomesOwned: function() {
        return Mangas.find({
            "user": Meteor.userId(),
            "mangasName": this.mangasName,
            "owned": true
        }, {
            sort: {
                "tomeNumber": 1
            }
        });
    },
    allTomesMissing: function() {
        return Mangas.find({
            "user": Meteor.userId(),
            "mangasName": this.mangasName,
            "owned": false
        }, {
            sort: {
                "tomeNumber": 1
            }
        });
    },
    missingTome: function() {
        var a = Mangas.findOne({
            "user": Meteor.userId(),
            "mangasName": this.mangasName,
            "owned": false
        });
        if (a) {
            return true;
        } else {
            return false;
        }
    },
    ownedTome: function() {
        var a = Mangas.findOne({
            "user": Meteor.userId(),
            "mangasName": this.mangasName,
            "owned": true
        });
        if (a) {
            return true;
        } else {
            return false;
        }
    },
});

Template.tomeDetails.events({
    'click #setOwnedTrue': function() {
        Meteor.call('setOwnedTrue', this._id, function(error) {
            if (error) {
                return throwError(error.message);
            }
        });
    },
    'click #setOwnedFalse': function() {
        Meteor.call('setOwnedFalse', this._id, function(error) {
            if (error) {
                return throwError(error.message);
            }
        });
    }
});
