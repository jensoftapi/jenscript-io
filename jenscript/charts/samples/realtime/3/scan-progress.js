var ProgressDevicePlugin = function(config) {
		this._init(config);
};
JenScript.Model.inheritPrototype(ProgressDevicePlugin, JenScript.Plugin);
JenScript.Model.addMethods(ProgressDevicePlugin,{
	
    _init : function(config) {
    	config = config || {};
    	 this.lockProgress = false;
    	 this.currentProgress = 0;
    	 JenScript.Plugin.call(this,config);
    },
    
    start :  function () {
        this.lockProgress = true;
        this.repaintPlugin();
    },

    stop : function() {
        this.lockProgress = false;
        this.repaintPlugin();
    },

    setCurrentProgress : function(currentScanValue) {
        this.currentProgress = currentScanValue;
        this.repaintPlugin();
    },
   
    paintScanningProcess : function (g2d) {
        var w2d = this.getProjection();
        var p2dUser = new JenScript.Point2D(this.currentProgress, 0);
        var p2ddevice = w2d.userToPixel(p2dUser);
        var h  =this.getProjection().getView().getDevice().getHeight();
        var deviceArea = new JenScript.SVGRect().origin(0,0).size(p2ddevice.getX(),h);

        //g2d.insertSVG(recZone2D.fill(this.getProjection().getThemeColor()).opacity(0.3).toSVG());
        g2d.insertSVG(deviceArea.fill('rgba(255,255,50,0.8)').opacity(0.3).toSVG());
        
        var annotation = "Current Process : " + this.currentProgress;
		var text = new JenScript.SVGElement().name('text')
							.attr('x',5)
							.attr('y',60)
							.attr('font-size','12')
							.attr('fill','black')
							.textContent(annotation);
		
		g2d.insertSVG(text.buildHTML());
    },

    paintPlugin : function(g2d,viewPart) {
        if (viewPart !== JenScript.ViewPart.Device) {
            return;
        }
        if (this.lockProgress) {
            this.paintScanningProcess(g2d);
        }
    },
    
});


