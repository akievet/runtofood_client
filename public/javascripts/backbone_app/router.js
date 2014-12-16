var Router = Backbone.Router.extend({
	routes: {
		"routes/:city/:starting/:food/:distance" : "list",
		"routes" : "landing",
		"*default" : "landing"
	}
})