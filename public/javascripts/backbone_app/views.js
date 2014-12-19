console.log("... required backbone views")

var directionsService = new google.maps.DirectionsService();

var RouteView = Backbone.View.extend({
	initialize: function(){
		this.model.toMapOptions();
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

		var mapDiv = $('<div>').addClass('seven columns offset-by-one map')[0];
		this.$el.find('.map-container').empty();
		this.$el.find('.map-container').append(mapDiv);

		var mapDistanceNode = this.$el.find('.map-distance')[0];

		var mapOptions =  this.model.get('mapData');
		var stylesArray = [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}]
		var zoom = this.model.get('zoom');

		var mapViewOptions = {
    	zoom: zoom,
    	center: mapOptions.origin,
    	styles: stylesArray
  	};

  	
  	this.map = new google.maps.Map(mapDiv, mapViewOptions);

  	var rendererOptions = {
  		polylineOptions: {
  			strokeColor: '#CCAB34',
  			strokeWeight: 5,
  		},
  		markerOptions: {
  			visible: false
  		}
  	};

  	var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
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

	  var map = this.map;
	 
	  var markerStart = new google.maps.Marker({
	  	position: mapOptions.origin,
	  	icon: {
	  		path: google.maps.SymbolPath.CIRCLE,
	  		scale: 5,
	  		strokeWeight: 0,
	  		strokeColor: '',
	  		fillColor: '#2EB29E',
	  		fillOpacity: 1
	  	}
	  });

	  var finishIcon = {
	  	path: 'M0-165c-27.618 0-50 21.966-50 49.054C-50-88.849 0 0 0 0s50-88.849 50-115.946C50-143.034 27.605-165 0-165z',
	  	fillColor: '#FFFFFF',
	  	fillOpacity: 1,
	  	strokeColor: '#5BFFE6',
	  	strokeWeight: 5,
	  	scale: 0.15
	  }

	  var markerFinish = new google.maps.Marker({
	  	position: mapOptions.destination,
	  	icon: finishIcon
	  });

	  directionsService.route(request, function(response, status) {
	    if (status == google.maps.DirectionsStatus.OK) {
	      mapDistanceNode.innerHTML += response.routes[0].legs[0].distance.text;
	      google.maps.event.addListenerOnce(map, 'idle', function(){
	      	directionsDisplay.setDirections(response);
	      	markerStart.setMap(map);
	      	markerFinish.setMap(map);
	      	google.maps.event.trigger(map, 'resize');
	      	
	    	});
	    }
	  });	

		return this;
	},
	toggleRouteDetails: function(e){
		if ( e.target.className == 'transit-toggle' ){
			$(e.target.nextElementSibling).slideToggle();	
		};
	}
});


var RouteListView = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.collection, 'reset', this.render);
	},
	render: function(){
		$('#header').empty();
		$('#main-illustration').css('display', 'none');
		$('#search-results').css('display', 'inherit');
		this.$el.empty();
		var that = this;
		this.collection.each(function(route){
			var view = new RouteView({model: route});
			that.$el.append(view.render().$el);
		});
	}
})


