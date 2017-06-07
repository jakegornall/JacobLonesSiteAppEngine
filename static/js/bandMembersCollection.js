var bandMembersCollection = bandMembersCollection || {};

$(function() {
	var BMsCollection = Backbone.Collection.extend({
		model: bandMemberModel,
		url: "/bandMembers",
		parse: function(data) {
			return data.data;
		}
	});

	bandMembersCollection = new BMsCollection();
});