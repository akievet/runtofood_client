console.log("...required backbone model")

var Route = Backbone.Model.extend({
	toMapOptions: function(){	
		var mapData;
		mapData = {
			"origin": this.get('starting_ltlng'),
			"destination": this.get('latitude') + "," + this.get('longitude'), 
			"travelMode": google.maps.TravelMode.WALKING,
			"unitSystem": google.maps.UnitSystem.IMPERIAL
		};

		if ( this.get('waypoint') ) {
			mapData["waypoints"] = [{
				"location": this.get('waypoint'),
				"stopover": false
			}];
		};

		this.set('mapData', mapData);
		return mapData;
	}
});