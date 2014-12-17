console.log("...required backbone model")

var Route = Backbone.Model.extend({
	toMapOptions: function(){	
		var mapData;
	
		var originLatlngArray = this.get('starting_ltlng').split(',');
		for(var i=0; i<originLatlngArray.length;i++) originLatlngArray[i] = parseFloat(originLatlngArray[i], 10);
		var originLatlng = new google.maps.LatLng(originLatlngArray[0], originLatlngArray[1]);

		var destinationLat = parseFloat(this.get('latitude'));
		var destinationLng = parseFloat(this.get('longitude'));
		var destinationLatLng = new google.maps.LatLng(destinationLat, destinationLng);

		mapData = {
			"origin": originLatlng,
			"destination": destinationLatLng,
			"travelMode": google.maps.TravelMode.WALKING,
			"unitSystem": google.maps.UnitSystem.IMPERIAL
		};


		// if ( this.get('waypoint') ) {
		// 	mapData["waypoints"] = [{
		// 		"location": this.get('waypoint'),
		// 		"stopover": false
		// 	}];
		// };

		this.set('mapData', mapData);
		return mapData;
	}
});

