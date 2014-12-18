console.log("...required backbone model")

var Route = Backbone.Model.extend({
	toMapOptions: function(){	
		var mapData;

		var originLatlng = new google.maps.LatLng(this.get('origin_lat'), this.get('origin_long'));
		var destinationLatLng = new google.maps.LatLng(this.get('dest_lat'), 'dest_long');

		mapData = {
			"origin": originLatlng,
			"destination": destinationLatLng,
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

