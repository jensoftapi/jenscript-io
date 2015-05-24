/**
 * 
 * @param container
 * @param width
 * @param height
 * 
 */
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

	
	//date range
	var startDate = new Date(2013, 09, 01);
	var endDate = new Date(2013, 11, 01);

	var proj1 = new JenScript.TimeXProjection({
		cornerRadius : 6,
		name : "proj1",
		minXDate : startDate,
		maxXDate : endDate,
		minY : 19,
		maxY : 24
	});
	view.registerProjection(proj1);
	
	//device outline
	var outline = new JenScript.DeviceOutlinePlugin({color : 'darkslategrey'});
	proj1.registerPlugin(outline);


	var southMetrics1 = new JenScript.AxisMetricsTiming({
		axis : JenScript.Axis.AxisSouth,
		models : [new JenScript.HourModel({}),new JenScript.DayModel({}),new JenScript.MonthModel({})],
		minor : {
			tickMarkerSize : 2,
			tickMarkerColor : JenScript.RosePalette.AEGEANBLUE,
			tickMarkerStroke : 1
		},
		median : {
			tickMarkerSize : 4,
			tickMarkerColor : JenScript.RosePalette.EMERALD,
			tickMarkerStroke : 1.2,
			tickTextColor : JenScript.RosePalette.EMERALD,
			tickTextFontSize : 10
		},
		major : {
			tickMarkerSize : 8,
			tickMarkerColor : JenScript.RosePalette.CORALRED,
			tickMarkerStroke : 3,
			tickTextColor : JenScript.RosePalette.CORALRED,
			tickTextFontSize : 12,
			tickTextOffset : 16
		}
	});
	proj1.registerPlugin(southMetrics1);
	
	
	var westMetrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisWest,
		gravity :'rotate'
	});
	proj1.registerPlugin(westMetrics);

	var tx1 = new JenScript.TranslatePlugin();
	proj1.registerPlugin(tx1);
	var tpad = new JenScript.TranslatePad();
	tx1.registerWidget(tpad);
	tx1.registerWidget(new JenScript.TranslateCompassWidget({
		ringFillColor : 'pink'
	}));
	tx1.select();

	var stockPlugin = new JenScript.StockPlugin({
		bearishColor : JenScript.RosePalette.CORALRED,
		bullishColor : JenScript.RosePalette.EMERALD,
	});
	proj1.registerPlugin(stockPlugin);

	stockPlugin.addLayer(new JenScript.CandleStickLayer({
		lowHighColor : JenScript.RosePalette.COALBLACK
	}));

	var legend = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'Timing metrics',
		fontSize : 14,
		textColor : 'purple',
		xAlign : 'right',
		yAlign : 'top',
	});
	proj1.registerPlugin(legend);
	
	
}
