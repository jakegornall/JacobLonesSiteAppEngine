var bandMemberView = bandMemberView || {};

$(function() {
	var BMView = Backbone.View.extend({
		tagName : "div",
		className : "band-member",
		template : _.template($("#band-member-template").html()),

		events : {
			"click .remove" : "removeMember",
			"click .edit-member" : "editMode",
			"submit .band-member-edit-form" : "update"
		},

		initialize: function() {
    		this.listenTo(this.model, "change", this.render);
    		this.listenTo(this.model, 'destroy', this.remove);
  		},

		render : function() {
			this.$el.html(this.template(this.model.toJSON()));
    		return this;
		},

		removeMember : function() {
			this.model.destroy();
		},

		editMode : function() {
			this.$el.find(".band-member-details").hide();
			this.$el.find(".band-member-edit-form").show();
		},

		update : function(e) {
    		e.preventDefault();
    		this.model.save({
    			firstName: this.$el.find(".firstName").val(),
    			lastName: this.$el.find(".lastName").val(),
    			role: this.$el.find(".role").val(),
    			email: this.$el.find(".email").val(),
    			admin: this.$el.find(".admin").val(),
    			picURL: this.$el.find(".member-pic-input").val()
    		});
    		this.$el.find(".band-member-details").show();
			this.$el.find(".band-member-edit-form").hide();
    	}

	});

	bandMemberView = BMView;
});