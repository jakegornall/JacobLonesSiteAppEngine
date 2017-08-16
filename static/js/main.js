require.config({
	baseUrl: './static/js',
	paths: {
        "main" : "main",
        "BandMemberModel": "./components/BandMemberModel",
        "BandMembersCollection": "./components/BandMembersCollection",
        "BandMembersView": "./components/BandMembersView",
        "BandMemberView": "./components/BandMemberView",
        "LonesApp": "./components/LonesApp"
    }
});

define('main', ['LonesApp'], function(LonesApp) {
	var app = new LonesApp;
	app.init();
});