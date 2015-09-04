Template.addCompleteMangas.events({
    'click .addTome': function(e, t) {
        return Blaze.render(Template.addTome, t.$('.tomes').get(0));
    }
});
