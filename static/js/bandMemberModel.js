var bandMemberModel = bandMemberModel || {};

$(function() {
	var BMModel = Backbone.Model.extend({
		defaults: {
			"_id": "",
			"firstName": "",
			"lastName": "",
			"role": "",
			"picURL": "",
			"email": "",
			"admin": false
		}
	});

	bandMemberModel = BMModel;
});