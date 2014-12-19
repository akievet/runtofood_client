function getParams(){
	return {
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

function renderHeader(count, address, distance, food){
	var data = {
		"count" : count,
		"address" : address,
		"distance" : distance,
		"food" : food
	};

	var template = _.template($("#header-template").html());
	$("#header").append(template(data));
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
			
			var resultsCount = data.length;
			var foodQuery = data[0].food;
			var addressQuery = data[0].starting_address;
			var milesQuery = data[0].distance;

			renderHeader(resultsCount, addressQuery, milesQuery, foodQuery);
			NProgress.done();
			console.table(data);
		})
	});

	// ---------------- THIS IS FOR TESTING ----------------

	inputDefaults();

	// ---------------- DISAPPEARING HEADER ----------------

	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = $('header').outerHeight();


	$(window).scroll(function(event){
		didScroll = true;
	});

	setInterval(function(){
		if (didScroll){
			hasScrolled();
			didScroll = false;
		}
	}, 250);

	function hasScrolled(){
		var st = $(this).scrollTop();
		if(Math.abs(lastScrollTop - st) <= delta)
			return;
		if (st > lastScrollTop && st > navbarHeight){
			$('header').removeClass('header-down').addClass('header-up');
		}else{
			if(st + $(window).height() < $(document).height()){
				$('header').removeClass('header-up').addClass('header-down');
			}
		}

		lastScrollTop = st;
	}



})
