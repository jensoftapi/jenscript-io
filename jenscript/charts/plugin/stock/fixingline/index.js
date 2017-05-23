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
	
	//device outline
	var outline = new JenScript.DeviceOutlinePlugin({color : 'darkslategrey'});
	proj1.registerPlugin(outline);

	//prepare metrics properties
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
		tickMarkerColor : JenScript.RosePalette.CORALRED,
		tickMarkerStroke : 3,
		tickTextColor : JenScript.RosePalette.CORALRED,
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
		textColor : JenScript.RosePalette.EMERALD,
		xAlign : 'right',
		yAlign : 'top',
	});
	proj1.registerPlugin(legend);
	
	var loader = new StockLoader(proj1,[2010,2011,2012,2013,2014],function(year,stocks){
		stockPlugin.setStocks(stocks);
	});
}
