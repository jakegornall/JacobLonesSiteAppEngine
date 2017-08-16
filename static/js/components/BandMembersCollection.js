define('BandMembersCollection', ['BandMemberModel'], function(BandMemberModel) {
	'use strict';

	var BandMembersCollection = Backbone.Collection.extend({
		'model': BandMemberModel,
		'url': '/bandMembers',

		parse: function(data) {
			return data.data;
		}
	});

	return BandMembersCollection;
});