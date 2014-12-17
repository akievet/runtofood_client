console.log("...required backbone collections")

var RouteList = Backbone.Collection.extend({
	model: Route,
	url: 'http://localhost:3000/routes'
});
