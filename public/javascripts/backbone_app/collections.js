console.log("...required backbone collections")

var RouteList = Backbone.Collection.extend({
	model: Route,
	url: 'https://runtofood-server.herokuapp.com/routes'
});
