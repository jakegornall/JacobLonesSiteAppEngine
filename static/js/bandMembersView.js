var bandMembersView = bandMembersView || {};

$(function() {
	var BMsView = Backbone.View.extend({
		$el : $('#band-members-view'),

		events : {
			"click .add-member" : "addMember"
		},

		initialize : function() {
			this.listenTo(this.collection, "add", this.addMemberView);
			this.render();

		},

		render : function() {
			this.collection.fetch();
			console.log(this.collection);
			this.collection.each(function(member) {
				console.log(member);
				this.addMemberView(member)
			}, this);
		},

		addMember : function() {
			this.collection.create();
		},

		addMemberView : function(member) {
			console.log("memberAdded");
			var view = new bandMemberView({ model: member });
			console.log(view.render().el);
      		$("#members-list").append(view.render().el);
		}

	});

	bandMembersView = new BMsView({ collection: bandMembersCollection });
});