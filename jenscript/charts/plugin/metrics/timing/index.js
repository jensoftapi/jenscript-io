
var minor = {
	tickMarkerSize : 2,
	tickMarkerColor : '#f1c40f',
	tickMarkerStroke : 1
};
var median = {
	tickMarkerSize : 4,
	tickMarkerColor : '#3498db',
	tickMarkerStroke : 1.2,
	tickTextColor : '#3498db',
	tickTextFontSize : 10,
	tickTextOffset : 4
	
};
var major = {
	tickMarkerSize : 8,
	tickMarkerColor : '#1abc9c',
	tickMarkerStroke : 3,
	tickTextColor : '#1abc9c',
	tickTextFontSize : 12,
	tickTextOffset : 4
};

function createTimingMetrics(container, width, height) {

	//view
	var view = new JenScript.View({
		name : container,
		width : width,
		height : height,
		holders : 20,
		west : 80,
		south : 80,
	});

	var startDate = new Date(2013, 10, 27);
	var endDate = new Date(2013, 11, 04);

	var proj1 = new JenScript.TimeXProjection({
		cornerRadius : 6,
		name : "proj1",
		minXDate : startDate,
		maxXDate : endDate,
		minY : 19,
		maxY : 24
	});
	view.registerProjection(proj1);
	
	var outline = new JenScript.DeviceOutlinePlugin({color : '#16a085'});
	proj1.registerPlugin(outline);

	var southMetrics = new JenScript.AxisMetricsTiming({
		axis : JenScript.Axis.AxisSouth,
		models : [new JenScript.HourModel({}),new JenScript.DayModel({}),new JenScript.MonthModel({}),new JenScript.YearModel({})],
		minor : minor,
		median : median,
		major :major
	});
	proj1.registerPlugin(southMetrics);
	
	var westMetrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisWest,
		gravity :'rotate'
	});
	proj1.registerPlugin(westMetrics);

	translate1 = new JenScript.TranslatePlugin({
		slaves : [
		          	{plugin :  southMetrics, direction : 'x'},
		          	{plugin :  westMetrics,  direction : 'y'},
		          ]
	});
	proj1.registerPlugin(translate1);
	var txw = new JenScript.TranslateX({
			xIndex:100,
			width : 150,
			height : 22,
			outlineFillColor : 'rgba(255,100,0,0.1)',
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
	
	var stockPlugin = new JenScript.StockPlugin({
		bearishColor : '#e67e22',
		bullishColor : '#1abc9c',
	});
	proj1.registerPlugin(stockPlugin);

	stockPlugin.addLayer(new JenScript.CandleStickLayer({
		lowHighColor : '#ecf0f1'
	}));

	var legend = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'TIMING METRICS',
		fontSize : 8,
		textColor : 'yellow',
		xAlign : 'left',
		yAlign : 'top',
	});
	proj1.registerPlugin(legend);
	
	var wheel = new JenScript.ZoomWheelPlugin({});
	proj1.registerPlugin(wheel);
}