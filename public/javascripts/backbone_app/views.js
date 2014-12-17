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
		var mapOptions =  this.model.get('mapData');

		var mapOptions = {
    	zoom: 3,
    	center: mapOptions.origin
  	};

  	this.map = new google.maps.Map(mapNode[0], mapOptions);

  	var directionsDisplay = new google.maps.DirectionsRenderer();
  	directionsDisplay.setMap(this.map);

		
	  var start = this.model.get('starting_ltlng');
	  var end = this.model.get('latitude') + ','+ this.model.get('longitude');
	  var request = {
	      origin: start,
	      destination: end,
	      travelMode: google.maps.TravelMode.WALKING
	  };

	  directionsService.route(request, function(response, status) {
	    if (status == google.maps.DirectionsStatus.OK) {
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


