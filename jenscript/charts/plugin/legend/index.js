

var minor = {
		tickMarkerSize : 2,
		tickMarkerColor : 'cyan',
		tickMarkerStroke : 1
};
var median = {
	tickMarkerSize : 4,
	tickMarkerColor : 'cyan',
	tickMarkerStroke : 1.2,
	tickTextColor : 'cyan',
	tickTextFontSize : 10,
	tickTextOffset : 8
};
var major = {
	tickMarkerSize : 8,
	tickMarkerColor : 'yellow',
	tickMarkerStroke : 3,
	tickTextColor : 'yellow',
	tickTextFontSize : 12,
	tickTextOffset : 16
};
	
function createView(container, width, height) {
	
	var view = new JenScript.View({
		name : container,
		width : width,
		height : height,
		holders : 20,
		west : 100,
		east : 80,
		south : 80,
	});
	
	var gloss = new JenScript.GlossViewForeground();

	view.addViewForeground(gloss);
	
	var proj = new JenScript.LinearProjection({
		cornerRadius : 6,
		name : "proj1",
		minX : -160,
		maxX : 190,
		minY : 200,
		maxY : 3600
	});
	view.registerProjection(proj);
	
	var gridPlugin = new JenScript.GridModeledPlugin({gridOrientation : 'Vertical',gridColor : 'green'});
	proj.registerPlugin(gridPlugin);

	var outline = new JenScript.DeviceOutlinePlugin({color:'rgba(0,255,0,0.3)'});
	proj.registerPlugin(outline);

	var southMetrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisSouth,
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
	
	var wheel = new JenScript.ZoomWheelPlugin({});
	proj.registerPlugin(wheel);
	
	translate1 = new JenScript.TranslatePlugin({
		slaves : [
		          	{plugin :  southMetrics, direction : 'x'},
		          	{plugin :  westMetrics,  direction : 'y'},
		          ]
	});
	proj.registerPlugin(translate1);
	var txw = new JenScript.TranslateX({
			xIndex:100,
			width : 150,
			height : 22,
			outlineFillColor : 'rgba(255,255,0,0.1)',
			outlineStrokeColor : 'rgba(255,255,0,0.4)',
			outlineStrokeWidth : 0.8,
			sample  : {step : 40, sleep : 10, fraction : 3},
			buttonFillColor:'rgba(255,255,0,0.2)',
			buttonRolloverFillColor:'rgba(255,255,0,1)',
			buttonDrawColor:'rgba(255,255,0,0.4)',
			buttonRolloverDrawColor:'rgba(255,255,0,1)'
		}
	);
	
	translate1.registerWidget(txw);
	
	translate1.registerWidget(new JenScript.TranslateCompassWidget({
		ringFillColor : 'yellow',
		ringFillOpacity : 0.7,
	}));
	
	
	
	translate1.select();


	var title = new JenScript.TitleLegendPlugin({
		layout : 'absolute',
		part   : JenScript.ViewPart.Device,
		text   : 'JenSoft APIs',
		fontSize : 12,
		textColor : 'pink',
		x : 200,
		y : 20,
		textAnchor : 'middle',
		rotate : false,
		rotateAngle : 90
	});
	proj.registerPlugin(title);
	
	var title2 = new JenScript.TitleLegendPlugin({
		layout : 'absolute',
		part   : JenScript.ViewPart.Device,
		text   : 'JenScript',
		fontSize : 12,
		textColor : 'orange',
		x : 200,
		y : 200,
		textAnchor : 'middle',
		rotate : false,
		rotateAngle : 90
	});
	proj.registerPlugin(title2);
	
	var title3 = new JenScript.TitleLegendPlugin({
		layout : 'absolute',
		part   : JenScript.ViewPart.Device,
		text   : 'JenScript',
		fontSize : 10,
		textColor : 'yellow',
		x : 100,
		y : 100,
		textAnchor : 'middle',
		rotate : true,
		rotateAngle : -60
	});
	proj.registerPlugin(title3);
	
}