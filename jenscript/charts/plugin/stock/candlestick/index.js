var minor = {
	tickMarkerSize : 2,
	tickMarkerColor : JenScript.RosePalette.PALMLEAF,
	tickMarkerStroke : 1
};
var median = {
	tickMarkerSize : 4,
	tickMarkerColor : 'yellow',
	tickMarkerStroke : 1.2,
	tickTextColor : 'yellow',
	tickTextFontSize : 10,
	tickTextOffset : 8
};
var major = {
	tickMarkerSize : 8,
	tickMarkerColor : JenScript.RosePalette.MANDARIN,
	tickMarkerStroke : 3,
	tickTextColor : JenScript.RosePalette.MANDARIN,
	tickTextFontSize : 12,
	tickTextOffset : 16
};

function createViewStockCandleStick(container, width, height) {

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
		minY : 19.5,
		maxY : 22.5
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
		axis : JenScript.Axis.AxisWest,
		minor : minor,
		median:median,
		major:major
	});
	proj1.registerPlugin(westMetrics);

	

	var stockPlugin = new JenScript.StockPlugin({
		bearishColor : JenScript.RosePalette.CORALRED,
		bullishColor : JenScript.RosePalette.EMERALD,
	});
	proj1.registerPlugin(stockPlugin);

	stockPlugin.addLayer(new JenScript.CandleStickLayer({
		lowHighColor : 'pink'
	}));
	
	
	var tx1 = new JenScript.TranslatePlugin({
		slaves : [
		          	{plugin : stockPlugin, direction : 'xy'},
		          ]
	});
	proj1.registerPlugin(tx1);
	var tpad = new JenScript.TranslatePad();
	tx1.registerWidget(tpad);
	tx1.registerWidget(new JenScript.TranslateCompassWidget({
		ringFillColor : 'yellow'
	}));
	tx1.select();

	var legend = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'SLV Fixing',
		fontSize : 14,
		textColor : 'purple',
		xAlign : 'right',
		yAlign : 'top',
	});
	proj1.registerPlugin(legend);
	
	var loader = new StockLoader(proj1,[2013,2014],function(year,stocks){
		stockPlugin.setStocks(stocks);
	});

}
