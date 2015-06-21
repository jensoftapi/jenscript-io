var ScanInfo = function(config) {
		this._init(config);
};
JenScript.Model.inheritPrototype(ScanInfo, JenScript.Plugin);
JenScript.Model.addMethods(ScanInfo,{
				
	_init : function(config) {
		JenScript.Plugin.call(this, config);
		this.channels = [];
		this.lockScan = false;
	},
	
	paintPlugin : function(g2d, part) {
		if (part !== JenScript.ViewPart.Device)
			return;
		if (this.lockScan) {
			this.paintCurrentScanningInfo(g2d);
			this.paintCurrentLastMultiplexScanningInfo(g2d);
		} else {
			this.paintScanningInfo(g2d);
		}
	},
	
	start : function() {
		this.lockScan = true;
	},

	stop : function() {
		this.lockScan = false;
	},

	addChannel : function(channel) {
		this.channels.push(channel);
		this.repaintPlugin();
	},

	paintScanningInfo : function(g2d) {
		var annotation = "Number Scanned channels : " + this.channels.length;
		var text = new JenScript.SVGElement().name('text')
							.attr('x',5)
							.attr('y',20)
							.attr('font-size','12')
							.attr('fill','black')
							.textContent(annotation);
		
		g2d.insertSVG(text.buildHTML());
	},

	paintCurrentScanningInfo : function(g2d) {
		var annotation = "Number Scanned channels : " + this.channels.length;
		var text = new JenScript.SVGElement().name('text')
							.attr('x',5)
							.attr('y',40)
							.attr('font-size','12')
							.attr('fill','black')
							.textContent(annotation);
		
		g2d.insertSVG(text.buildHTML());
	},

	paintCurrentLastMultiplexScanningInfo : function(g2d) {
		if (this.channels.length - 1 >= 0) {
			var sm = this.channels[this.channels.length - 1];
			var annotation = "Last Channel detect : " + sm.getName() + " | Power " + sm.getRayValue() + " dBm";
			var text = new JenScript.SVGElement().name('text')
					.attr('x',5)
					.attr('y',60)
					.attr('font-size','12')
					.attr('fill','black')
					.textContent(annotation);
			g2d.insertSVG(text.buildHTML());
		}
	},
});