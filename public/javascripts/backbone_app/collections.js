console.log("...required backbone collections")

var RouteList = Backbone.Collection.extend({
	model: Route,
	url: 'http://162.243.242.31/routes'
});
