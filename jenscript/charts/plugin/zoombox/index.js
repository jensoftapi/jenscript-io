
var view1;
var proj1;
var proj12;

var view2;
var proj2;

var southMetrics1 ;

var stockPluginView1Proj1;
var stockPluginView1Proj2;
var stockPluginView2Proj1;

//date range
var startDate = new Date(2014, 08, 15);
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
		tickTextOffset : 8
	};
	var major2 = {
		tickMarkerSize : 8,
		tickMarkerColor : '#3498db',
		tickMarkerStroke : 3,
		tickTextColor : '#3498db',
		tickTextFontSize : 12,
		tickTextOffset : 10
	};


function createView1Proj1() {
	proj1 = new JenScript.TimeXProjection({
		name : "proj1",
		minXDate : startDate,
		maxXDate : endDate,
		minY : 13,
		maxY : 22,
		policy : {paint : 'ALWAYS'}
	});
	view1.registerProjection(proj1);
	
	var outline = new JenScript.DeviceOutlinePlugin({color : '#c0392b', strokeOpacity : 0.8, strokeWidth : 1});
	proj1.registerPlugin(outline);
	
	
	 southMetrics1 = new JenScript.AxisMetricsTiming({
		axis : JenScript.Axis.AxisSouth,
		models : [new JenScript.HourModel({}),new JenScript.DayModel({}),new JenScript.MonthModel({}),new JenScript.YearModel({})],
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
	
	var eastMetrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisEast,
		minor : minor,
		median:median,
		major:major
	});
	proj1.registerPlugin(eastMetrics);
	
	//LEGEND
	var mme12Legend = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'MME 12',
		fontSize : 14,
		textColor : '#27ae60',
		xAlign : 'left',
		yAlign : 'bottom',
	});
	proj1.registerPlugin(mme12Legend);
	var mme26Legend = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'MME 26',
		fontSize : 14,
		textColor : '#e67e22',
		xAlign : 'left',
		yAlign : 'bottom',
		yMargin: 26
	});
	proj1.registerPlugin(mme26Legend);
	
	
	stockPluginView1Proj1 = new JenScript.StockPlugin({
		bearishColor : 'rgb(211, 84, 0)',
		bullishColor : 'rgb(41, 128, 185)',
		name : "Main Stock Plugin"
	});
	proj1.registerPlugin(stockPluginView1Proj1);
	
	stockPluginView1Proj1.addLayer(new JenScript.CandleStickLayer({
		lowHighColor : 'white'
	}));
	
	stockPluginView1Proj1.addLayer(new JenScript.StockExponentialMovingAverageLayer({moveCount:12,curveColor:'#27ae60'}));
	stockPluginView1Proj1.addLayer(new JenScript.StockExponentialMovingAverageLayer({moveCount:26,curveColor:'#e67e22'}));
	
}

function createView1Proj2() {
	proj12 = new JenScript.TimeXProjection({
		name : "proj12",
		minXDate : startDate,
		maxXDate : endDate,
		minY : 13,
		maxY : 22,
		policy : {paint : 'ACTIVE'},
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
		bearishColor : '#c0392b',
		bullishColor : '#2ecc71',
	});
	proj12.registerPlugin(stockPluginView1Proj2);
	
	stockPluginView1Proj2.addLayer(new JenScript.OhlcLayer({
		markerColor : '#1abc9c',
		markerWidth : 1.5
	}));
	
}

function createView2Proj1() {
	
	 proj2 = new JenScript.TimeXProjection({
		cornerRadius : 6,
		name : "proj2",
		minXDate : startDate,
		maxXDate : endDate,
		minY : -1.5,
		maxY : 1.5
	});
	view2.registerProjection(proj2);
	
	var outline2 = new JenScript.DeviceOutlinePlugin({color : '#1abc9c', strokeOpacity : 0.8, strokeWidth : 1});
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
		lineColor:'#1abc9c',
		lineOpacity:1,
		lineWidth:1,
		
		macdColor:'#c0392b',
		signalColor:'#2980b9',
	}));
	
	var legend1 = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'MACD (12-26-9)',
		fontSize : 14,
		textColor : '#1abc9c',
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
		textColor : '#c0392b',
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
		west : 70,
		south : 60,
	});
	
	
	createView1Proj1();
	createView1Proj2();
	

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
	
	
	
	
	var loader = new StockLoader(proj1,[2014,2015,2016],function(year,stocks){
		stockPluginView1Proj1.setStocks(stocks);
		stockPluginView1Proj2.setStocks(stocks);
		stockPluginView2Proj1.setStocks(stocks);
	});

	
	var boxView1Proj1 = new JenScript.ZoomBoxPlugin({
		name : 'mainBox',
		slaves : [stockPluginView1Proj1]
		});
	
	boxView1Proj1.registerWidget(new JenScript.ZoomBoxWidget({
		width : 60,
		height :  16,
		outlineStrokeColor : 'rgba(0,229,238,1)',
		outlineFillColor : 'rgba(0,229,238,0.3)',
		outlineStrokeWidth : 0.8,
		buttonFillColor :  'rgba(0,229,238,0.6)',
		buttonRolloverDrawColor :  'white',
		buttonStrokeWidth : 0.8,
		buttonRolloverFillColor : 'rgba(0,229,238,1)',
		mode : {paint : {proj : 'always', plugin : 'always'},event: {proj : 'always', plugin : 'always'}}
	}));
	
	proj1.registerPlugin(boxView1Proj1);
	
	var boxView1Proj2 = new JenScript.ZoomBoxPlugin({
		name : 'secondaryBox',
		slaves : [stockPluginView1Proj2]
	});
	proj12.registerPlugin(boxView1Proj2);
	
	var boxView2Proj1 = new JenScript.ZoomBoxPlugin({
		mode : 'x',
		name : 'tertiaryBox',
		slaves : [stockPluginView2Proj1]
	});
	proj2.registerPlugin(boxView2Proj1);
	
	var synchronizer = new JenScript.ZoomBoxSynchronizer({
		boxes : [ boxView1Proj1,boxView1Proj2,boxView2Proj1 ]
	});
	
	view1.setActiveProjection(proj1);
	boxView1Proj1.select();
	

}
