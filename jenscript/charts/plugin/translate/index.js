
var view1;
var proj;
var proj12;

var view2;
var proj2;

var stockPluginView1Proj1;
var stockPluginView1Proj2;
var stockPluginView2Proj1;

//date range
var startDate = new Date(2015, 08, 15);
var endDate = new Date(2015, 10, 15);

var minor = {
		tickMarkerSize : 2,
		tickMarkerColor : 'cyan',
		tickMarkerStroke : 1
	};
	var median = {
		tickMarkerSize : 4,
		tickMarkerColor : 'cyan',
		tickMarkerStroke : 1.2,
		tickTextColor : 'cyan',
		tickTextFontSize : 10,
		tickTextOffset : 8
	};
	var major = {
		tickMarkerSize : 8,
		tickMarkerColor : '#3498db',
		tickMarkerStroke : 3,
		tickTextColor : '#3498db',
		tickTextFontSize : 12,
		tickTextOffset : 10
	};

	var minor2 = {
			tickMarkerSize : 2,
			tickMarkerColor : 'cyan',
			tickMarkerStroke : 1
		};
		var median2 = {
			tickMarkerSize : 4,
			tickMarkerColor : 'cyan',
			tickMarkerStroke : 1.2,
			tickTextColor : 'cyan',
			tickTextFontSize : 10,
			tickTextOffset : 6
		};
		var major2 = {
			tickMarkerSize : 8,
			tickMarkerColor : '#3498db',
			tickMarkerStroke : 3,
			tickTextColor : '#3498db',
			tickTextFontSize : 12,
			tickTextOffset : 10
		};

var southMetrics1;
var westMetrics;
var eastMetrics;

function createView1Proj1() {
	proj1 = new JenScript.TimeXProjection({
		name : "proj1",
		minXDate : startDate,
		maxXDate : endDate,
		minY : 13,
		maxY : 16,
		paintMode : 'ALWAYS'
	});
	view1.registerProjection(proj1);
	
	//OUTLINE PLUGIN
	var outline = new JenScript.DeviceOutlinePlugin({color : '#d35400', strokeOpacity : 0.8, strokeWidth : 1});
	proj1.registerPlugin(outline);
	
	
	//METRICS PLUGIN
	 southMetrics1 = new JenScript.AxisMetricsTiming({
		axis : JenScript.Axis.AxisSouth,
		models : [new JenScript.HourModel({}),new JenScript.DayModel({}),new JenScript.MonthModel({})],
		minor : minor,
		median:median,
		major:major
	});
	proj1.registerPlugin(southMetrics1);
	
	
	 westMetrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisWest,
		minor : minor,
		median:median,
		major:major
	});
	proj1.registerPlugin(westMetrics);
	
	 eastMetrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisEast,
		minor : minor,
		median:median,
		major:major
	});
	proj1.registerPlugin(eastMetrics);
	
	var mme12Legend = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'MME 12',
		fontSize : 14,
		textColor : '#16a085',
		xAlign : 'left',
		yAlign : 'bottom',
	});
	proj1.registerPlugin(mme12Legend);
	var mme26Legend = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'MME 26',
		fontSize : 14,
		textColor : '#c0392b',
		xAlign : 'left',
		yAlign : 'bottom',
		yMargin: 26
	});
	proj1.registerPlugin(mme26Legend);
	
	
	stockPluginView1Proj1 = new JenScript.StockPlugin({
		bearishColor : 'rgba(231, 76, 60,0.8)',
		bullishColor : 'rgba(52, 152, 219,0.8)',
	});
	proj1.registerPlugin(stockPluginView1Proj1);
	
	stockPluginView1Proj1.addLayer(new JenScript.CandleStickLayer({
		lowHighColor : 'white',
		bearishColor : 'rgba(231, 76, 60,0.8)',
		bullishColor : 'rgba(52, 152, 219,0.8)',
	}));
	
	stockPluginView1Proj1.addLayer(new JenScript.StockExponentialMovingAverageLayer({moveCount:12,curveColor:'#16a085'}));
	stockPluginView1Proj1.addLayer(new JenScript.StockExponentialMovingAverageLayer({moveCount:26,curveColor:'#c0392b'}));
	
}

function createView1Proj2() {
	proj12 = new JenScript.TimeXProjection({
		name : "proj12",
		minXDate : startDate,
		maxXDate : endDate,
		minY : 13,
		maxY : 16,
		paintMode : 'ACTIVE'
	});
	view1.registerProjection(proj12);
	
	var outline12 = new JenScript.DeviceOutlinePlugin({color : '#ffb6c1', strokeOpacity : 0.8, strokeWidth : 1});
	proj12.registerPlugin(outline12);
	
	//LEGEND PLUGIN
	var ohlcLegend = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'OHLC',
		fontSize : 14,
		textColor : 'cyan',
		xAlign : 'left',
		yAlign : 'bottom',
		yMargin: 46
	});
	proj12.registerPlugin(ohlcLegend);

	stockPluginView1Proj2 = new JenScript.StockPlugin({
		bearishColor : 'rgba(231, 76, 60,0.8)',
		bullishColor : 'rgba(52, 152, 219,0.8)',
	});
	proj12.registerPlugin(stockPluginView1Proj2);
	
	stockPluginView1Proj2.addLayer(new JenScript.OhlcLayer({
		markerColor : 'cyan',
		markerWidth : 1.5
	}));
	
}

function createView2Proj1() {
	
	//ANOTHER PROJ FOR MANAGE MACD IN DIFFERENT PROJECTION
	 proj2 = new JenScript.TimeXProjection({
		cornerRadius : 6,
		name : "proj2",
		minXDate : startDate,
		maxXDate : endDate,
		minY : -1.5,
		maxY : 1.5
	});
	view2.registerProjection(proj2);
	
	//device outline
	var outline2 = new JenScript.DeviceOutlinePlugin({color : '#3498db', strokeOpacity : 0.8, strokeWidth : 1});
	proj2.registerPlugin(outline2);
	

	var southMetrics2 = new JenScript.AxisMetricsTiming({
		axis : JenScript.Axis.AxisSouth,
		models : [new JenScript.HourModel({}),new JenScript.DayModel({}),new JenScript.MonthModel({})],
		minor : minor2,
		median:median2,
		major:major2
	});
	proj2.registerPlugin(southMetrics2);
	
	var eastMetrics2 = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisEast,
		minor : minor2,
		median:median2,
		major:major2
	});
	proj2.registerPlugin(eastMetrics2);
	
	stockPluginView2Proj1 = new JenScript.StockPlugin();
	proj2.registerPlugin(stockPluginView2Proj1);
	stockPluginView2Proj1.addLayer(new JenScript.StockMACDLayer({
		moveCountSignal:9,
		moveCountMin:12,
		moveCountMax:26,
		lineColor:'#d35400',
		lineOpacity:1,
		lineWidth:1,
		
		macdColor:'#e74c3c',
		signalColor:'#2980b9',
	}));
	
	var legend1 = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'MACD (12-26-9)',
		fontSize : 14,
		textColor : '#d35400',
		xAlign : 'right',
		yAlign : 'top',
		yMargin: 5
	});
	proj2.registerPlugin(legend1);
	
	var legend2 = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'Signal MME 9',
		fontSize : 14,
		textColor : '#2980b9',
		xAlign : 'right',
		yAlign : 'bottom',
		yMargin: 5
	});
	proj2.registerPlugin(legend2);
	var legend3 = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'MACD (12/26)',
		fontSize : 14,
		textColor : '#e74c3c',
		xAlign : 'right',
		yAlign : 'bottom',
		yMargin: 25
	});
	proj2.registerPlugin(legend3);
}

function createViewStockMACD(container1,container2, width, height) {

	//view
	view1 = new JenScript.View({
		name : container1,
		width : width,
		height : height,
		east : 50,
		west : 50,
		south : 60,
	});
	

	createView1Proj1();
	createView1Proj2();
	
	
	var translateView1Proj1 = new JenScript.TranslatePlugin({
				name : 'mainTranslate',
				slaves : [
				          {plugin : stockPluginView1Proj1, direction : 'xy'},
				          {plugin : southMetrics1, direction :'x'},
				          {plugin : westMetrics, direction :'y'},
				          {plugin : eastMetrics, direction :'y'}
				         ]
			});
	proj1.registerPlugin(translateView1Proj1);
	
	var translateView1Proj2 = new JenScript.TranslatePlugin({
				name : 'secondaryTranslate',
				slaves : [
				          {plugin : stockPluginView1Proj2 , direction :'xy'}
				         ]
	});
	proj12.registerPlugin(translateView1Proj2);
	
	
	translateView1Proj1.registerWidget(new JenScript.TranslateCompassWidget({
		ringFillColor : 'rgba(255,130,0,0.7)',
		ringFillOpacity : 0.7,
		mode : {paint : {proj : 'always', plugin : 'selected'},event: {proj : 'always', plugin : 'always'}}
	}));
	
	
	var txWidget = new JenScript.TranslateX({
		width : 60,
		height :  16,
		yIndex : 0,
		xIndex : 3,
		outlineStrokeColor : 'rgba(255,130,0,0.8)',
		outlineFillColor : 'rgba(255,130,0,0.2)',
		outlineStrokeWidth : 0.8,
		buttonFillColor :  'rgba(255,130,0,0.5)',
		buttonStrokeWidth : 0.8,
		buttonRolloverFillColor : 'rgba(255,130,0,1)',
		buttonRolloverDrawColor :  'white',
		sample  : {step : 20, sleep : 10,fraction : 2}, // pixel/3 with 40 step, each step execute in 10 millisecond
		mode : {paint : {proj : 'always', plugin : 'selected'},event: {proj : 'always', plugin : 'always'}}
	});
	
	
	var tyWidget = new JenScript.TranslateY({
		width : 16,
		height :  60,
		outlineStrokeColor : 'rgba(255,130,0,0.8)',
		outlineFillColor : 'rgba(255,130,0,0.2)',
		outlineStrokeWidth : 0.8,
		buttonFillColor :  'rgba(255,130,0,0.5)',
		buttonStrokeWidth : 0.8,
		buttonRolloverFillColor : 'rgba(255,130,0,1)',
		buttonRolloverDrawColor :  'white',
		sample  : {step : 20, sleep : 10,fraction : 2}, // pixel/3 with 40 step, each step execute in 10 millisecond
		mode : {paint : {proj : 'always', plugin : 'selected'},event: {proj : 'always', plugin : 'always'}}
	});
	
	translateView1Proj1.registerWidget(tyWidget);
	translateView1Proj1.registerWidget(txWidget);
	
	
	
	

	//view 2
	view2 = new JenScript.View({
		name : container2,
		width : width,
		height : height,
		east : 50,
		west : 50,
		south : 60,
	});
	
	createView2Proj1();
	
	
	
	
	var loader = new StockLoader(proj1,[2015,2016],function(year,stocks){
		stockPluginView1Proj1.setStocks(stocks);
		stockPluginView1Proj2.setStocks(stocks);
		stockPluginView2Proj1.setStocks(stocks);
	});


	
	
	var tx2 = new JenScript.TranslatePlugin({
		mode:'tx',
		name : 'tertiaryTranslate',
		slaves : [{plugin : stockPluginView2Proj1, direction :'xy'}]
	});
	tx2.registerWidget(new JenScript.TranslateCompassWidget({
		ringFillColor : '#c0392b',
		ringFillOpacity : 0.7,
		xIndex :0,
	}));
	proj2.registerPlugin(tx2);

	
	
	var synchronizer = new JenScript.TranslateSynchronizer({
		translates : [ translateView1Proj1,translateView1Proj2, tx2 ]
	});
	

	
	view1.setActiveProjection(proj1);
	translateView1Proj1.select();
	
}

