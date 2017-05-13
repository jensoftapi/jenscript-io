(function(){
	JenScript.ZoomBoxWidget = function(config) {
		this._init(config);
	};
	JenScript.Model.inheritPrototype(JenScript.ZoomBoxWidget, JenScript.Widget);
	
	JenScript.Model.addMethods(JenScript.ZoomBoxWidget, {
		_init : function(config){
			config = config || {};
			config.name = 'ZoomBoxWidget';
	        config.Id =  'zoomBoxWidget'+JenScript.sequenceId++;
	        config.width = 200;
	        config.height = 100;
	        config.xIndex = (config.xIndex !== undefined)?config.xIndex: 100;
	        config.yIndex =  (config.yIndex !== undefined)?config.yIndex: 0;
			JenScript.Widget.call(this,config);
		},
		
		
	
		onRegister : function() {
			var that = this;
	    	var proj = this.getHost().getProjection();
	    	if(proj !== undefined){
	    		var view = proj.getView();
	    		if(view !== undefined){
	    			this.create();
				}
	    	}else{
	    		this.getHost().addPluginListener('projectionRegister',function (plugin){
	    			console.log("attach projection listener");
					if(plugin.getProjection().getView() !== undefined){
						that.create();
					}else{
						//wait view registering
						plugin.getProjection().addProjectionListener('viewRegister',function(proj){
							that.create();
						},'Wait for projection view registering for box widget ');
					}
				},'Plugin listener for projection register for box widget');
	    	}
		},
	   
	   paintWidget : function(g2d) {
        	var f = this.getWidgetFolder().getBounds2D();
        	var rect = new JenScript.SVGRect()
				.origin(f.x,f.y)
				.size(f.width,f.height).stroke('green').fillNone();
				var group = new JenScript.SVGGroup().Id(this.Id);
				g2d.deleteGraphicsElement(this.Id);
				group.child(rect.toSVG());
				g2d.insertSVG(group.toSVG());
	    },
	});
})();