require.config({
	baseUrl: './static/js',
	paths: {
        "main" : "main",
        "BandMemberModel": "./components/BandMemberModel",
        "BandMembersCollection": "./components/BandMembersCollection",
        "BandMembersView": "./components/BandMembersView",
        "BandMemberView": "./components/BandMemberView"
    }
});

define('main', [
	'BandMembersView',
	'BandMembersCollection'
	], function(
	BandMembersView,
	BandMembersCollection
	) {

	var bandMembersCollection = new BandMembersCollection;

	var bandMembersView = new BandMembersView({
		'collection': bandMembersCollection
	});
});