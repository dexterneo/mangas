Template.home.helpers({
    covers: function() {
        return MangasData.find({}, {
            fields: {
                "cover": 1
            }
        });
    }
});
