console.log("... required backbone views")

var directionsService = new google.maps.DirectionsService();



var RouteView = Backbone.View.extend({
	initialize: function(){
		this.model.toMapOptions()
	},
	tagName: 'div',
	template: _.template($("#route-template").html()),
	events: {
		"click" : "toggleRouteDetails"
	},
	render: function(){
		this.$el.html(this.template({
			route: this.model.toJSON()
		}));

		var mapNode = this.$el.find('.map');
		var mapDistanceNode = this.$el.find('.map-distance')[0];

		var mapOptions =  this.model.get('mapData');
		var stylesArray = [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]

		var mapViewOptions = {
    	zoom: 18,
    	center: mapOptions.origin,
    	styles: stylesArray
  	};

  	this.map = new google.maps.Map(mapNode[0], mapViewOptions);

  	var directionsDisplay = new google.maps.DirectionsRenderer();
  	directionsDisplay.setMap(this.map);

		
	  var start = this.model.get('starting_ltlng');
	  var end = this.model.get('dest_lat') + ','+ this.model.get('dest_long');

	  if (mapOptions.waypoints){
	  	var wypts = mapOptions.waypoints;
	  	var request = {
	      origin: start,
	      destination: end,
	      waypoints: wypts,
	      travelMode: google.maps.TravelMode.WALKING,
	  	};
	  } else {
	  	var request = {
	      origin: start,
	      destination: end,
	      travelMode: google.maps.TravelMode.WALKING,
	  	};
	  }; 

	  directionsService.route(request, function(response, status) {
	    if (status == google.maps.DirectionsStatus.OK) {
	      mapDistanceNode.innerHTML += response.routes[0].legs[0].distance.text;
	      directionsDisplay.setDirections(response);
	    }
	  });

		return this;
	},
	toggleRouteDetails: function(e){
		$(e.target.nextElementSibling).slideToggle();
	}
});



var RouteListView = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.collection, 'reset', this.render);
	},
	render: function(){
		this.$el.empty();
		var that = this;
		this.collection.each(function(route){
			var view = new RouteView({model: route});
			that.$el.append(view.render().$el);
		});
	}
})


