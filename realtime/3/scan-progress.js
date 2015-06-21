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
    
    start() {
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
        var recZone2D = new JenScript.SVGRect().origin(0,0).size(p2ddevice.getX(),this.getProjection().getView().getDevice().getHeight());

        g2d.insertSVG(recZone2D.fill(this.getProjection().getThemeColor()).opacity(0.3).toSVG());

//        String annotation = "Current Process : " + currentProgress;
//        g2d.setFont(new Font("Tahoma", Font.PLAIN, 10));
//        g2d.setColor(Color.BLACK);
//        g2d.drawString(annotation, 5, 20);
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


