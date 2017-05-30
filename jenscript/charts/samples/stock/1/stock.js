
var startDate = new Date(2013, 09, 01);
var endDate = new Date(2013, 11, 01);
var projPrice;
var stockPlugin1,stockPlugin2;
var translate1,translate2;

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
function createPriceView(container, width, height) {
	
	var view = new JenScript.View({
		name : container,
		width : width,
		height : height,
		holders : 20,
		west : 100,
		east : 80,
		south : 80,
	});

	projPrice = new JenScript.TimeXProjection({
		cornerRadius : 6,
		name : "proj1",
		minXDate : startDate,
		maxXDate : endDate,
		minY : 17,
		maxY : 23
	});
	view.registerProjection(projPrice);
	
	stockPlugin1 = new JenScript.StockPlugin({
		bearishColor : 'rgba(231, 76, 60,0.8)',
		bullishColor : 'rgba(52, 152, 219,0.8)',
	});
	projPrice.registerPlugin(stockPlugin1);

	stockPlugin1.addLayer(new JenScript.CandleStickLayer({
		lowHighColor : 'black'
	}));
	stockPlugin1.addLayer(new JenScript.StockBollingerLayer({
		bandColor:'#e74c3c',
		bandOpacity: 0.1,
		lineColor:'#3498db',
		lineOpacity:0.6,
		lineWidth : 0.5
	}));

	var outline = new JenScript.DeviceOutlinePlugin({color:'#9b59b6'});
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

	translate1 = new JenScript.TranslatePlugin();
	projPrice.registerPlugin(translate1);
	var txw = new JenScript.TranslateX({
			xIndex:100,
			width : 150,
			height : 22,
			outlineStrokeColor : 'rgba(0,0,0,0)',
			buttonStrokeColor:'white',
			buttonFillColor:'black',
			buttonRolloverStrokeColor:'#1abc9c'}
	);
	translate1.registerWidget(txw);
	translate1.select();

	var title = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'SLV Stock',
		fontSize : 14,
		textColor : 'black',
		xAlign : 'right',
		yAlign : 'top',
	});
	projPrice.registerPlugin(title);
}

function createVolumeView(container, width, height) {
	
	var view = new JenScript.View({
		name : container,
		width : width,
		height : height,
		holders : 20,
		west : 100,
		east : 80,
		south : 80,
	});


	var projVolume = new JenScript.TimeXProjection({
		cornerRadius : 6,
		name : "proj1",
		minXDate : startDate,
		maxXDate : endDate,
		minY : 0,
		maxY : 100000000
	});
	view.registerProjection(projVolume);
	
	//device outline
	var outline = new JenScript.DeviceOutlinePlugin({color : 'darkslategrey'});
	projVolume.registerPlugin(outline);


	var southMetrics1 = new JenScript.AxisMetricsTiming({
		axis : JenScript.Axis.AxisSouth,
		models : [new JenScript.HourModel({}),new JenScript.DayModel({}),new JenScript.MonthModel({})],
		minor:minor,
		median:median,
		major:major
	});
	projVolume.registerPlugin(southMetrics1);
	
	var westMetrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisWest,
		minor:minor,
		median:median,
		major:major
	});
	projVolume.registerPlugin(westMetrics);

	translate2 = new JenScript.TranslatePlugin({
		mode : 'tx'
	});
	projVolume.registerPlugin(translate2);

	stockPlugin2 = new JenScript.StockPlugin({
		bearishColor : 'rgba(231, 76, 60,0.8)',
		bullishColor : 'rgba(52, 152, 219,0.8)',
	});
	projVolume.registerPlugin(stockPlugin2);

	stockPlugin2.addLayer(new JenScript.VolumeBarLayer({
		bearishColor : 'rgba(231, 76, 60,0.8)',
		bullishColor : 'rgba(52, 152, 219,0.8)',
	}));

	var title = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'SLV Volume',
		fontSize : 14,
		textColor : 'black',
		xAlign : 'right',
		yAlign : 'top',
	});
	projVolume.registerPlugin(title);
}

function createViews(w){
	createPriceView('priceView',w,300);
	createVolumeView('volumeView',w,200);
	var synchronizer = new JenScript.TranslateSynchronizer({
		translates : [ translate1, translate2 ]
	});
	translate1.select();

	var __loader = new StockLoader(projPrice,[2013,2014,2015],function(year,stocks){
		stockPlugin1.setStocks(stocks);
		stockPlugin2.setStocks(stocks);
	});
}

