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

function createViewStockMovingAverage(container, width, height) {


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
	var startDate = new Date(2013, 04, 25);
	var endDate = new Date(2013, 08, 05);

	var proj1 = new JenScript.TimeXProjection({
		cornerRadius : 6,
		name : "proj1",
		minXDate : startDate,
		maxXDate : endDate,
		minY : 16,
		maxY : 40
	});
	view.registerProjection(proj1);
	
	//device outline
	var outline = new JenScript.DeviceOutlinePlugin({color : 'darkslategrey'});
	proj1.registerPlugin(outline);

	
	
	var southMetrics1 = new JenScript.AxisMetricsTiming({
		axis : JenScript.Axis.AxisSouth,
		models : [new JenScript.HourModel({}),new JenScript.DayModel({}),new JenScript.MonthModel({})],
		minor : minor,
		median:median,
		major:major
	});
	proj1.registerPlugin(southMetrics1);
	
	
	var westMetrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisWest
	});
	proj1.registerPlugin(westMetrics);

	var tx1 = new JenScript.TranslatePlugin();
	proj1.registerPlugin(tx1);
	tx1.select();


	var stockPlugin = new JenScript.StockPlugin();
	proj1.registerPlugin(stockPlugin);

	stockPlugin.addLayer(new JenScript.StockFixingLayer({
		curveColor:'black',
		curveWidth : 0.4
	}));
	stockPlugin.addLayer(new JenScript.StockMovingAverageLayer({
		curveColor:'#1abc9c',
		moveCount : 20
	}));
	
	
	var legend = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'SLV Fixing',
		fontSize : 12,
		textColor : 'black',
		xAlign : 'right',
		yAlign : 'top',
	});
	proj1.registerPlugin(legend);
	
	var legend2 = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'SLV SMA(20)',
		fontSize : 12,
		textColor : '#e74c3c',
		xAlign : 'right',
		yAlign : 'top',
		yMargin: 26
	});
	proj1.registerPlugin(legend2);

	
	var loader = new StockLoader(proj1,[2012,2013],function(year,stocks){
		stockPlugin.setStocks(stocks);
	});

}


/**
 * Create stock weighted moving average curve view
 * 
 * @param container
 * @param width
 * @param height
 */
function createViewStockWeightedMovingAverage(container, width, height) {


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
	var startDate = new Date(2013, 04, 25);
	var endDate = new Date(2013, 08, 05);

	var proj1 = new JenScript.TimeXProjection({
		cornerRadius : 6,
		name : "proj1",
		minXDate : startDate,
		maxXDate : endDate,
		minY : 16,
		maxY : 40
	});
	view.registerProjection(proj1);
	
	//device outline
	var outline = new JenScript.DeviceOutlinePlugin({color : '#1abc9c'});
	proj1.registerPlugin(outline);

	
	
	var southMetrics1 = new JenScript.AxisMetricsTiming({
		axis : JenScript.Axis.AxisSouth,
		models : [new JenScript.HourModel({}),new JenScript.DayModel({}),new JenScript.MonthModel({})],
		minor : minor,
		median:median,
		major:major
	});
	proj1.registerPlugin(southMetrics1);
	
	
	var westMetrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisWest
	});
	proj1.registerPlugin(westMetrics);

	var tx1 = new JenScript.TranslatePlugin();
	proj1.registerPlugin(tx1);
	tx1.select();

	var stockPlugin = new JenScript.StockPlugin();
	proj1.registerPlugin(stockPlugin);

	stockPlugin.addLayer(new JenScript.StockFixingLayer({
		curveColor:'#e67e22',
		curveWidth : 1.5
	}));
	stockPlugin.addLayer(new JenScript.StockWeightedMovingAverageLayer({
		curveColor:'#2ecc71',
		moveCount : 20
	}));
	
	var legend = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'SLV Fixing',
		fontSize : 14,
		textColor : '#2ecc71',
		xAlign : 'right',
		yAlign : 'top',
	});
	proj1.registerPlugin(legend);
	var legend2 = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'SLV WMA(20)',
		fontSize : 14,
		textColor : 'e67e22',
		xAlign : 'right',
		yAlign : 'top',
		yMargin: 26
	});
	proj1.registerPlugin(legend2);

	
	var loader = new StockLoader(proj1,[2012,2013],function(year,stocks){
		stockPlugin.setStocks(stocks);
	});

}

function createViewStockExponentialMovingAverage(container, width, height) {

	var view = new JenScript.View({
		name : container,
		width : width,
		height : height,
		holders : 20,
		west : 80,
		south : 80,
	});
	
	var startDate = new Date(2013, 04, 25);
	var endDate = new Date(2013, 08, 05);

	var proj1 = new JenScript.TimeXProjection({
		cornerRadius : 6,
		name : "proj1",
		minXDate : startDate,
		maxXDate : endDate,
		minY : 16,
		maxY : 40
	});
	view.registerProjection(proj1);
	
	var outline = new JenScript.DeviceOutlinePlugin({color : '#1abc9c'});
	proj1.registerPlugin(outline);
	
	var southMetrics1 = new JenScript.AxisMetricsTiming({
		axis : JenScript.Axis.AxisSouth,
		models : [new JenScript.HourModel({}),new JenScript.DayModel({}),new JenScript.MonthModel({})],
		minor : minor,
		median:median,
		major:major
	});
	proj1.registerPlugin(southMetrics1);
	
	var westMetrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisWest
	});
	proj1.registerPlugin(westMetrics);

	var tx1 = new JenScript.TranslatePlugin();
	proj1.registerPlugin(tx1);
	tx1.select();

	var stockPlugin = new JenScript.StockPlugin();
	proj1.registerPlugin(stockPlugin);

	stockPlugin.addLayer(new JenScript.StockFixingLayer({
		curveColor:'#2ecc71',
		curveWidth : 1
	}));
	stockPlugin.addLayer(new JenScript.StockExponentialMovingAverageLayer({
		curveColor:'#3498db',
		moveCount : 20
	}));
	
	var legend = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'SLV Fixing',
		fontSize : 14,
		textColor : '#2ecc71',
		xAlign : 'right',
		yAlign : 'top',
	});
	proj1.registerPlugin(legend);
	
	var legend2 = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'SLV EMA(20)',
		fontSize : 14,
		textColor : '#3498db',
		xAlign : 'right',
		yAlign : 'top',
		yMargin: 26
	});
	proj1.registerPlugin(legend2);
	
	var loader = new StockLoader(proj1,[2012,2013],function(year,stocks){
		stockPlugin.setStocks(stocks);
	});
}