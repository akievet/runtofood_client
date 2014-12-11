var RouteView = Backbone.View.extend({
	tagName: 'li',
	template: _.template($("#route-template").html()),
	render: function(){
		this.$el.html(this.template({
			route: this.model.toJSON()
		}));
		return this;
	}
});

var RouteListView = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.collection, 'reset', this.render);
	},
	render: function(){
		this.$el.empty();
		var that = this;
		this.collection.each(function(route){
			var view = new RouteView({model: route});
			that.$el.append(view.render().$el);
		});
	}
})