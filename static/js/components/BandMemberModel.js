define('BandMemberModel', [], function() {
	'use strict';

	var BandMemberModel = Backbone.Model.extend({
		defaults: {
			"_id": "",
			"firstName": "First Name",
			"lastName": "Last Name",
			"role": "Role",
			"picURL": "/static/images/placeholder_bioPic.png",
			"email": "email",
			"admin": false
		}
	});

	return BandMemberModel;
});
