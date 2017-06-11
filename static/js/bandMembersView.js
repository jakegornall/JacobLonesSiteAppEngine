var bandMembersView = bandMembersView || {};

$(function() {
	var BMsView = Backbone.View.extend({

		$el : $('#band-members-view'),

		initialize : function() {
			var that = this;

			this.listenTo(this.collection, "add", this.addMemberView);
			this.render();

			$("#add-member").click(function() {
				that.collection.create();
			});

		},

		render : function() {
			this.collection.fetch();

			this.collection.each(function(member) {
				that.addMemberView(member)
			});
		},

		addMember : function() {
			this.collection.create();
		},

		addMemberView : function(member) {
			console.log("memberAdded");
			var view = new bandMemberView({ model: member });
      		$("#members-list").append(view.render().el);
		}

	});

	bandMembersView = new BMsView({ collection: bandMembersCollection });
});