
var minor = {
	tickMarkerSize : 2,
	tickMarkerColor : '#9b59b6',
	tickMarkerStroke : 1
};
var median = {
	tickMarkerSize : 4,
	tickMarkerColor : '#e74c3c',
	tickMarkerStroke : 1.2,
	tickTextColor : '',
	tickTextFontSize : 10
};
var major = {
	tickMarkerSize : 8,
	tickMarkerColor : '#1abc9c',
	tickMarkerStroke : 3,
	tickTextColor : '#1abc9c',
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
		minX : -1200,
		maxX : 1200,
		minY : 200,
		maxY : 3600
	});
	view.registerProjection(proj);

	var outline = new JenScript.DeviceOutlinePlugin({color:'rgba(0,255,0,0.3)'});
	proj.registerPlugin(outline);

	var southMetrics = new JenScript.AxisMetricsFree({
		axis : JenScript.Axis.AxisSouth,
		minor:minor,
		median:median,
		major:major
	});
	
	var westMetrics = new JenScript.AxisMetricsFree({
		axis : JenScript.Axis.AxisWest,
		minor:minor,
		median:median,
		major:major
	});
	
	westMetrics.addMetrics(600,'Label A');
	westMetrics.addMetrics(2000,'2000');
	westMetrics.addMetrics(2000,'2000');
	
	southMetrics.addMetrics(-1000,'-1000');
	southMetrics.addMetrics(500,'500');
	southMetrics.addMetrics(234);
	southMetrics.addMetrics(0,'Label B');
	
	proj.registerPlugin(southMetrics);
	proj.registerPlugin(westMetrics);

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
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'Metrics',
		fontSize : 14,
		textColor : '#3498db',
		xAlign : 'right',
		yAlign : 'top',
	});
	proj.registerPlugin(title);
	
}