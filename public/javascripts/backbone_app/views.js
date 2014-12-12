console.log("... required backbone views")

var RouteView = Backbone.View.extend({
	tagName: 'div',
	template: _.template($("#route-template").html()),
	events: {
		"click" : "toggleRouteDetails"
	},
	render: function(){
		this.$el.html(this.template({
			route: this.model.toJSON()
		}));
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
		$('body').css({
			'background-image': 'none',
			});
		var that = this;
		this.collection.each(function(route){
			var view = new RouteView({model: route});
			that.$el.append(view.render().$el);
		});
	}
})
