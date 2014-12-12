function getParams(){
	return{
		city: $('#city').val(),
		address: $('#address').val(),
		food: $('#food').val(),
		distance: $('#distance').val(),
	}
}



$(function(){
	var html;
	var routeList = new RouteList();
	var routeListView = new RouteListView({
		collection: routeList,
		el: "#routes",
	})


	$('input[type=submit]').on('click', function(e){
		routeList.fetch({
			reset: true,
			data: getParams(),
		}).done(function(data){
			console.table(data);
		})
	});


})
