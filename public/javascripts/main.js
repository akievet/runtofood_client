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
	$('#address').val('505 LaGuardia Pl');
	$('#food').val('bagels');
	$('#distance').val(5);
}


$(function(){

	var html;

	routeList = new RouteList();

	var routeListView = new RouteListView({
		collection: routeList,
		el: "#routes",
	})

	$('.search-bar').keydown(function(e){
		if(e.keyCode == 13){
			$('input[type=submit]').trigger('click');
		}
	});

	$('input[type=submit]').on('click', function(e){
		NProgress.start();
		routeList.fetch({
			reset: true,
			data: getParams()
		}).done(function(data){
			NProgress.done();
			console.table(data);
		})
	});

	inputDefaults();


})
