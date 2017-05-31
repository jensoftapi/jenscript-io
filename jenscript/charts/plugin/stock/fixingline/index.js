/**
 * Create stock curve fixing view
 * 
 * @param container
 * @param width
 * @param height
 */
function createViewStockCurveFixing(container, width, height) {

	var view = new JenScript.View({
		name : container,
		width : width,
		height : height,
		holders : 20,
		west : 80,
		south : 80,
	});

	var startDate = new Date(2009, 09, 01);
	var endDate = new Date(2015, 11, 01);

	var proj1 = new JenScript.TimeXProjection({
		cornerRadius : 6,
		name : "proj1",
		minXDate : startDate,
		maxXDate : endDate,
		minY : 0,
		maxY : 60
	});
	view.registerProjection(proj1);
	
	var outline = new JenScript.DeviceOutlinePlugin({color : '#1abc9c'});
	proj1.registerPlugin(outline);

	var minor = {
			tickMarkerSize : 2,
			tickMarkerColor : 'yellow',
			tickMarkerStroke : 1
	};
	var median = {
		tickMarkerSize : 4,
		tickMarkerColor : '#d35400',
		tickMarkerStroke : 1.2,
		tickTextColor : '#d35400',
		tickTextFontSize : 10
	};
	var major = {
		tickMarkerSize : 8,
		tickMarkerColor : '#2980b9',
		tickMarkerStroke : 3,
		tickTextColor : '#2980b9',
		tickTextFontSize : 12,
		tickTextOffset : 16
	};
	var southMetrics1 = new JenScript.AxisMetricsTiming({
		axis : JenScript.Axis.AxisSouth,
		models : [new JenScript.MonthModel({}), new JenScript.YearModel({})],
		minor : minor,
		median : median,
		major : major,
		gravity : 'rotate'
	});
	proj1.registerPlugin(southMetrics1);
	
	
	var westMetrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisWest,
		minor : minor,
		median : median,
		major : major
	});
	proj1.registerPlugin(westMetrics);


	var stockPlugin = new JenScript.StockPlugin();
	proj1.registerPlugin(stockPlugin);

	stockPlugin.addLayer(new JenScript.StockFixingLayer({
		curveColor :'pink',
		curveWidth : 1
	}));

	
	var legend = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'SLV Fixing',
		fontSize : 14,
		textColor : '#1abc9c',
		xAlign : 'right',
		yAlign : 'top',
	});
	proj1.registerPlugin(legend);
	
	var loader = new StockLoader(proj1,[2010,2011,2012,2013,2014],function(year,stocks){
		stockPlugin.setStocks(stocks);
	});
	
	var tx1 = new JenScript.TranslatePlugin({
		slaves : [
		          	{ plugin : stockPlugin, direction : 'xy'},
		          ]
	});
	proj1.registerPlugin(tx1);
	var tpad = new JenScript.TranslatePad();
	tx1.registerWidget(tpad);
	tx1.registerWidget(new JenScript.TranslateCompassWidget({
		ringFillColor : 'yellow'
	}));
	tx1.select();
}
