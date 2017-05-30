

var indigo = JenScript.RosePalette.INDIGO;
var choco = JenScript.RosePalette.CHOCOLATE;
var emerald = JenScript.RosePalette.EMERALD;
var aegean = JenScript.RosePalette.AEGEANBLUE;

	
function createMicro1(container, width, height) {
	var view = new JenScript.View({
		name : container,
		width : width,
		height : height,
		holders : 2,
		south: 1,
		west : 22,
		
	});
	var proj = new JenScript.LinearProjection({
		name : "proj1",
		minX : 0,
		maxX : 12.2,
		minY : 0,
		maxY : 22
	});
	view.registerProjection(proj);

	var minor = {
		tickMarkerSize : 1,
		tickMarkerColor : JenScript.RosePalette.PINGPIZZAZZ,
		tickMarkerStroke : 1
	};
	var median = {
		tickMarkerSize : 1,
		tickMarkerColor : JenScript.RosePalette.EMERALD,
		tickMarkerStroke : 0.6,
		tickTextColor : JenScript.RosePalette.EMERALD,
		tickTextFontSize : 8
	};
	var major = {
		tickMarkerSize : 4,
		tickMarkerColor : JenScript.RosePalette.CALYPSOBLUE,
		tickMarkerStroke : 1.2,
		tickTextColor : JenScript.RosePalette.CALYPSOBLUE,
		tickTextFontSize : 10
	};
	var southMetrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisSouth,
		axisBaseLine:true,
		axisBaseLineColor :JenScript.RosePalette.CALYPSOBLUE,
		axisBaseLineStrokeWidth : 2,
		minor : minor,
		median : median,
		major :major
	});
	proj.registerPlugin(southMetrics);
	
	var westMetrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisWest, gravity :'natural', //gravity :'rotate'
		minor : minor,
		median : median,
		major :major
	});
	
	proj.registerPlugin(westMetrics);
	
	
	//CURVE FUNCTION 
	var xValues = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,12 ];
	var yValues = [ 1, 2.1, 3, 1.9, 3.4, 5.1, 4.2, 8.5, 9.9, 12, 18,17.4 ];
	var lineSourceFunction = new JenScript.LineSource({
					nature : 'XFunction',
					xValues : xValues,
					yValues : yValues
				});
	
	
	var functionPlugin = new JenScript.FunctionPlugin();
	proj.registerPlugin(functionPlugin);
	
	var curve = new JenScript.Curve({
			name :'my curve function',
			themeColor : 'gray',
			source : lineSourceFunction
			});
	
	
	var g1 = new JenScript.GlyphMetric({
		fontSize : 10,
		value : 3.5,
		metricsLabel : '3.5',
		fillColor: 'cyan'
	});

	curve.addMetric(g1);
	
	functionPlugin.addFunction(curve);
	
	
	//scatter
	//CURVE FUNCTION 
	var xValues = [ 9, 10,12 ];
	var yValues = [ 12, 18,17.4 ];
	var lineSourceFunction = new JenScript.LineSource({
					nature : 'XFunction',
					xValues : xValues,
					yValues : yValues
				});
	
	
	var scatterPlugin = new JenScript.FunctionPlugin();
	proj.registerPlugin(scatterPlugin);
	
	var scatter = new JenScript.Scatter2({
			name :'my scatter function',
			themeColor : JenScript.RosePalette.EMERALD,
			source : lineSourceFunction
	});
	
	
	functionPlugin.addFunction(scatter);

	var t1 = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : '134',
		fontSize : 38,
		fontWeight : 'bold',
		textColor : 'rgb(40,120,40)',
		xAlign : 'left',
		yAlign : 'top',
		xMargin : 10,
		yMargin : 15
	});
	proj.registerPlugin(t1);
	
	var t2 = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'Profile visits',
		fontSize : 12,
		textColor : '#bdc3c7',
		xAlign : 'left',
		yAlign : 'top',
		xMargin : 10,
		yMargin : 8
	});
	proj.registerPlugin(t2);
	
	
	var t2 = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : '+ 287%',
		fontSize : 12,
		textColor : '#1abc9c',
		xAlign : 'right',
		yAlign : 'bottom',
		xMargin : 4,
		yMargin : 4
	});
	proj.registerPlugin(t2);
	
	
	
	
}

JenScript.Scatter2 = function(config) {
	this.__init(config);
};
JenScript.Model.inheritPrototype(JenScript.Scatter2, JenScript.Scatter);
JenScript.Model.addMethods(JenScript.Scatter2, {
	__init : function(config){
		config = config || {};
		config.name = 'ScatterPathFunction';
	    JenScript.Scatter.call(this,config);
	},
	
	/**
	 * paint scatter function
	 * @param g2d the graphics context
	 */
	paintFunction : function(g2d){
		//this.paintPathFunction(g2d);
		this.source.clearCurrentFunction();
		var userPointsFunction = this.source.getCurrentFunction();
		var proj = this.getProjection();
		for (var i = 0; i < userPointsFunction.length; i++) {
			var p = userPointsFunction[i];
			var scatter = new JenScript.SVGCircle().center(proj.userToPixelX(p.x),proj.userToPixelY(p.y)).radius(3).fill(JenScript.RosePalette.EMERALD);
			g2d.insertSVG(scatter.toSVG());
		}
	}
});


