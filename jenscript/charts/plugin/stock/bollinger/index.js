

var minor = {
	tickMarkerSize : 2,
	tickMarkerColor : 'cyan',
	tickMarkerStroke : 1
};
var median = {
	tickMarkerSize : 4,
	tickMarkerColor : 'yellow',
	tickMarkerStroke : 1.2,
	tickTextColor : 'yellow',
	tickTextFontSize : 10
};
var major = {
	tickMarkerSize : 8,
	tickMarkerColor : 'rgb(240,88,0)',
	tickMarkerStroke : 3,
	tickTextColor : 'rgb(240,88,0)',
	tickTextFontSize : 12,
	tickTextOffset : 16
};
	
function createViewStockBollingerBand(container, width, height) {
	
	
	
	var startDate = new Date(2013, 09, 01);
	var endDate = new Date(2013, 11, 01);
	
	
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

	
	var projPrice = new JenScript.TimeXProjection({
		cornerRadius : 6,
		name : "proj1",
		minXDate : startDate,
		maxXDate : endDate,
		minY : 17,
		maxY : 23
	});
	view.registerProjection(projPrice);
	
	
	
	var stockPlugin1 = new JenScript.StockPlugin({
		bearishColor : 'rgba(230, 126, 34,0.8)',
		bullishColor : 'rgba(41, 128, 185,0.8)',
	});
	projPrice.registerPlugin(stockPlugin1);

	
	var candles = new JenScript.CandleStickLayer({
		lowHighColor : 'white',
		bearishColor : 'rgba(230, 126, 34,0.8)',
		bullishColor : 'rgba(41, 128, 185,0.8)',
	});
	
	stockPlugin1.addLayer(candles);
	stockPlugin1.addLayer(new JenScript.StockBollingerLayer({
		bandColor:'rgb(236, 240, 241)',
		bandOpacity: 0.1,
		lineColor:'white',
		lineOpacity:0.8,
		lineWidth : 0.5
	}));

	var outline = new JenScript.DeviceOutlinePlugin({color:'yellow'});
	projPrice.registerPlugin(outline);


	var southMetrics1 = new JenScript.AxisMetricsTiming({
		axis : JenScript.Axis.AxisSouth,
		models : [new JenScript.HourModel({}),new JenScript.DayModel({}),new JenScript.MonthModel({})],
		minor:minor,
		median:median,
		major:major
	});
	projPrice.registerPlugin(southMetrics1);
	
	var westMetrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisWest,
		minor:minor,
		median:median,
		major:major
	});
	projPrice.registerPlugin(westMetrics);

	var translate1 = new JenScript.TranslatePlugin();
	projPrice.registerPlugin(translate1);
	var txw = new JenScript.TranslateX({
			xIndex:100,
			width : 150,
			height : 22,
			outlineStrokeColor : 'rgba(0,0,0,0)',
			//outlineFillColor: 'gray',
			buttonStrokeColor:'white',
			buttonFillColor:'black',
			buttonRolloverStrokeColor:'yellow'}
	);
	translate1.registerWidget(txw);
	translate1.select();

	var title = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'Bollinger',
		fontSize : 14,
		textColor : '#9b59b6',
		xAlign : 'right',
		yAlign : 'top',
	});
	projPrice.registerPlugin(title);
	
	
	var __loader = new StockLoader(projPrice,[2013,2014,2015],function(year,stocks){
		stockPlugin1.setStocks(stocks);
	});
	
	
}
