define('LonesApp', ['BandMembersView', 'BandMembersCollection'], function(BandMembersView, BandMembersCollection) {

	var LonesApp = function() {

		this.init = function() {
			var that = this;

			var bandMembersCollection = new BandMembersCollection;

			var bandMembersView = new BandMembersView({
				'collection': bandMembersCollection
			});
		}
	}

	return LonesApp;
});