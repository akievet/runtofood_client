function getParams(){
	return{
		city: $('#city').val(),
		address: $('#address').val(),
		food: $('#food').val(),
		distance: $('#distance').val(),
	}
}

$(function(){
	var routeList = new RouteList();
	var routeListView = new RouteListView({
		collection: routeList,
		el: "#routes",
	})
	// routeList.fetch({reset: true});

	$('input[type=submit]').on('click', function(e){
		routeList.fetch({
			reset: true,
			data: getParams(),
		})
	});
})