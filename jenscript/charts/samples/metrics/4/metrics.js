

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
	tickMarkerColor : JenScript.Color.lighten(choco,20),
	tickMarkerStroke : 3,
	tickTextColor : JenScript.Color.lighten(choco,20),
	tickTextFontSize : 12,
	tickTextOffset : 16
};
	
function createMetricsView(container, width, height) {
	
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

	var outline = new JenScript.DeviceOutlinePlugin({color:JenScript.Color.lighten(indigo,40)});
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

	//translate
	translate1 = new JenScript.TranslatePlugin();
	proj.registerPlugin(translate1);
	var txw = new JenScript.TranslateX({
			xIndex:100,
			width : 150,
			height : 22,
			outlineStrokeColor : 'rgba(0,0,0,0)',
			sample  : {step : 10, sleep : 5,fraction : 20},
			buttonFillColor:'black',
			buttonRolloverFillColor:JenScript.Color.lighten(emerald,40),
			buttonDrawColor:'white',
			buttonRolloverDrawColor:JenScript.Color.lighten(emerald,20)
		}
	);
	
	translate1.registerWidget(txw);
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



