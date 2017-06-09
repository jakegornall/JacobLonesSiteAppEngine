var bandMemberModel = bandMemberModel || {};

$(function() {
	var BMModel = Backbone.Model.extend({
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

	bandMemberModel = BMModel;
});