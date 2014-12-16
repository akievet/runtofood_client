function getParams(){
	return{
		city: $('#city').val(),
		address: $('#address').val(),
		food: $('#food').val(),
		distance: $('#distance').val(),
	}
}

function inputDefaults(){
	$('#city').val(1);
	$('#address').val('505 LaGuardia Pl, nyc');
	$('#food').val('bagels');
	$('#distance').val(5);
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
