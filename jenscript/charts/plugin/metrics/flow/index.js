

var indigo = JenScript.RosePalette.INDIGO;
var choco = JenScript.RosePalette.CHOCOLATE;
var emerald = JenScript.RosePalette.EMERALD;
var aegean = JenScript.RosePalette.AEGEANBLUE;
var minor = {
	tickMarkerSize : 2,
	tickMarkerColor : JenScript.RosePalette.AEGEANBLUE,
	tickMarkerStroke : 1
};
var median = {
	tickMarkerSize : 4,
	tickMarkerColor : JenScript.RosePalette.EMERALD,
	tickMarkerStroke : 1.2,
	tickTextColor : JenScript.RosePalette.EMERALD,
	tickTextFontSize : 10
};
var major = {
	tickMarkerSize : 8,
	tickMarkerColor : 'yellow',
	tickMarkerStroke : 3,
	tickTextColor : 'yellow',
	tickTextFontSize : 12,
	tickTextOffset : 16
};
	
function createMetricsView(container, width, height) {
	
	//view
	var view = new JenScript.View({
		name : container,
		width : width,
		height : height,
		holders : 20,
		west : 100,
		east : 80,
		south : 80,
	});

	
	var proj = new JenScript.LinearProjection({
		cornerRadius : 6,
		name : "proj1",
		minX : -1200,
		maxX : 1200,
		minY : 200,
		maxY : 3600
	});
	view.registerProjection(proj);
	
	

	//device outline
	var outline = new JenScript.DeviceOutlinePlugin({color:'#3498db'});
	proj.registerPlugin(outline);


	var southMetrics = new JenScript.AxisMetricsFlow({
		flowStart : -700,
		flowEnd : 300,
		flowInterval : 200,
		axis : JenScript.Axis.AxisSouth,
		minor:minor,
		median:median,
		major:major
	});
	proj.registerPlugin(southMetrics);
	
	var westMetrics = new JenScript.AxisMetricsFlow({
		flowStart : -1200,
		flowEnd : 1200,
		flowInterval : 300,
		axis : JenScript.Axis.AxisWest,
		minor:minor,
		median:median,
		major:major
	});
	proj.registerPlugin(westMetrics);
	

	//translate
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
		textColor : JenScript.RosePalette.CHOCOLATE,
		xAlign : 'right',
		yAlign : 'top',
	});
	proj.registerPlugin(title);
	
	
}



