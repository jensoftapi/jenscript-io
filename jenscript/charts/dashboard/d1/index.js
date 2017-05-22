
var view1, view2;
var proj, proj12, proj13, proj2, proj22;
var stockPluginView1Proj1, stockPluginView1Proj2, stockPluginView1Proj3, stockPluginView2Proj1, stockPluginView2Proj2;
var translateView1Proj1, translateView1Proj2, translateView2Proj3, translateView2Proj1, translateView2Proj2;
var boxView1Proj1, boxView1Proj2, boxView1Proj3, boxView2Proj1, boxView2Proj2;

var startDate = new Date(2014, 11, 6);
var endDate = new Date(2015, 04, 6);

var southMetrics1;
var westMetrics;
var eastMetrics;

var southMetrics2;
var eastMetrics2;

var random = function getRandomArbitrary(min, max) {
	  return Math.random() * (max - min) + min;
	}

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

var minor2 = {
		tickMarkerSize : 2,
		tickMarkerColor : JenScript.RosePalette.LIME,
		tickMarkerStroke : 1
	};
var median2 = {
		tickMarkerSize : 4,
		tickMarkerColor : JenScript.RosePalette.TURQUOISE,
		tickMarkerStroke : 1.2,
		tickTextColor : JenScript.RosePalette.TURQUOISE,
		tickTextFontSize : 10,
		tickTextOffset : 8
	};
var major2 = {
		tickMarkerSize : 8,
		tickMarkerColor : 'yellow',
		tickMarkerStroke : 3,
		tickTextColor : JenScript.RosePalette.TURQUOISE,
		tickTextFontSize : 12,
		tickTextOffset : 16
	};

function createView1Proj1() {
	proj1 = new JenScript.TimeXProjection({
		name : "proj1",
		minXDate : startDate,
		maxXDate : endDate,
		minY : 12.5,
		maxY : 18.8,
		paintMode : 'ALWAYS'
	});
	view1.registerProjection(proj1);
	
	
	//OUTLINE PLUGIN
	var outline = new JenScript.DeviceOutlinePlugin({color : JenScript.RosePalette.MELON, strokeOpacity : 0.8, strokeWidth : 1});
	proj1.registerPlugin(outline);
	
	
	//METRICS PLUGIN
	 southMetrics1 = new JenScript.AxisMetricsTiming({
		axis : JenScript.Axis.AxisSouth,
		models : [new JenScript.HourModel({}),new JenScript.DayModel({}),new JenScript.MonthModel({}), new JenScript.YearModel({})],
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
	
	//LEGEND
	var mme12Legend = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'MME 12',
		fontSize : 10,
		textColor : JenScript.RosePalette.DEEPHARBOR,
		xAlign : 'left',
		yAlign : 'bottom',
	});
	proj1.registerPlugin(mme12Legend);
	var mme26Legend = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'MME 26',
		fontSize : 10,
		textColor : JenScript.RosePalette.LEMONPEEL,
		xAlign : 'left',
		yAlign : 'bottom',
		yMargin: 18
	});
	proj1.registerPlugin(mme26Legend);
	
	var titleLegend = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.North,
		text   : 'SLV Fixing Trend',
		fontSize : 8,
		textColor : 'pink',
		xAlign : 'right',
		yAlign : 'bottom',
		xMargin: 50
	});
	proj1.registerPlugin(titleLegend);
	
	var dateLegend = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.North,
		text   : new Date().toString(),
		fontSize : 8,
		textColor : 'pink',
		xAlign : 'center',
		yAlign : 'bottom',
	});
	proj1.registerPlugin(dateLegend);
	
	var dateLegend = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'Price, $ (USD)',
		fontSize : 10,
		rotate : true,
		rotateAngle : -90,
		textColor : 'cyan',
		xAlign : 'left',
		xMargin : 10,
		yAlign : 'center',
	});
	proj1.registerPlugin(dateLegend);
	
	//STOCK PLUGIN
	stockPluginView1Proj1 = new JenScript.StockPlugin({
		bearishColor : 'rgba(231, 76, 60,0.8)',
		bullishColor : 'rgba(52, 152, 219,0.8)',
	});
	proj1.registerPlugin(stockPluginView1Proj1);
	
	stockPluginView1Proj1.addLayer(new JenScript.CandleStickLayer({
		lowHighColor : 'rgba(250,250,250,0.5)'
	}));
	
	stockPluginView1Proj1.addLayer(new JenScript.StockExponentialMovingAverageLayer({moveCount:12,curveColor:JenScript.RosePalette.DEEPHARBOR}));
	stockPluginView1Proj1.addLayer(new JenScript.StockExponentialMovingAverageLayer({moveCount:26,curveColor:JenScript.RosePalette.LEMONPEEL}));
	
}

function createView1Proj2() {
	proj12 = new JenScript.TimeXProjection({
		name : "proj12",
		minXDate : startDate,
		maxXDate : endDate,
		minY : 12.5,
		maxY : 18.8,
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

	//STOCK PLUGIN
	stockPluginView1Proj2 = new JenScript.StockPlugin({
		bearishColor : JenScript.RosePalette.MELON,
		bullishColor : JenScript.RosePalette.TURQUOISE,
	});
	proj12.registerPlugin(stockPluginView1Proj2);
	
	stockPluginView1Proj2.addLayer(new JenScript.OhlcLayer({
		markerColor : 'cyan',
		markerWidth : 1.5
	}));
	
}

function createView1Proj3() {
	proj13 = new JenScript.TimeXProjection({
		name : "proj13",
		minXDate : startDate,
		maxXDate : endDate,
		minY : 12.5,
		maxY : 18.8,
		paintMode : 'ACTIVE'
	});
	view1.registerProjection(proj13);
	
	var outline12 = new JenScript.DeviceOutlinePlugin({color : '#ffb6c1', strokeOpacity : 0.8, strokeWidth : 1});
	proj13.registerPlugin(outline12);
	
	var legend = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'Bollinger',
		fontSize : 14,
		textColor : 'pink',
		xAlign : 'left',
		yAlign : 'bottom',
		yMargin: 46
	});
	proj13.registerPlugin(legend);

	stockPluginView1Proj3 = new JenScript.StockPlugin({
		bearishColor : JenScript.RosePalette.MELON,
		bullishColor : JenScript.RosePalette.TURQUOISE,
	});
	proj13.registerPlugin(stockPluginView1Proj3);
	
	stockPluginView1Proj3.addLayer(new JenScript.StockBollingerLayer({
		bandColor:'rgba(192, 57, 43,0.4)',
		bandOpacity: 0.4,
		lineColor:'rgba(192, 57, 43,1)',
		lineOpacity:0.6,
		lineWidth : 0.5
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
	
	var outline2 = new JenScript.DeviceOutlinePlugin({color : JenScript.Color.brighten(JenScript.RosePalette.TURQUOISE,40), strokeOpacity : 0.8, strokeWidth : 1});
	proj2.registerPlugin(outline2);
	

	southMetrics2 = new JenScript.AxisMetricsTiming({
		axis : JenScript.Axis.AxisSouth,
		models : [new JenScript.HourModel({}),new JenScript.DayModel({}),new JenScript.MonthModel({}),new JenScript.YearModel({})],
		minor : minor2,
		median:median2,
		major:major2
	});
	proj2.registerPlugin(southMetrics2);
	
	eastMetrics2 = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisEast,
		minor : minor2,
		median:median2,
		major:major2,
		gravity : 'rotate'
		
	});
	proj2.registerPlugin(eastMetrics2);
	
	stockPluginView2Proj1 = new JenScript.StockPlugin();
	proj2.registerPlugin(stockPluginView2Proj1);
	stockPluginView2Proj1.addLayer(new JenScript.StockMACDLayer({
		moveCountSignal:9,
		moveCountMin:12,
		moveCountMax:26,
		lineColor:JenScript.RosePalette.MANDARIN,
		lineOpacity:1,
		lineWidth:1,
		
		macdColor:'rgba(255,130,0,0.7)',
		signalColor:'rgba(52, 152, 219,0.7)',
	}));
	
	var legend1 = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'MACD (12-26-9)',
		fontSize : 14,
		textColor : JenScript.RosePalette.MANDARIN,
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
		textColor : 'rgba(52, 152, 219,0.7)',
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
		textColor : 'rgba(255,130,0,0.7)',
		xAlign : 'right',
		yAlign : 'bottom',
		yMargin: 25
	});
	proj2.registerPlugin(legend3);
}

function createView2Proj2() {
	
	 proj22 = new JenScript.TimeXProjection({
		cornerRadius : 6,
		name : "proj1",
		minXDate : startDate,
		maxXDate : endDate,
		minY : 0,
		maxY : 100000000
	});
	view2.registerProjection(proj22);
	
	//device outline
	var outline = new JenScript.DeviceOutlinePlugin({color : 'rgba(230, 126, 34,0.6)'});
	proj22.registerPlugin(outline);
	
	var westMetrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisWest,
		minor:minor,
		median:median,
		major:major,
		gravity : 'rotate'
	});
	proj22.registerPlugin(westMetrics);


	stockPluginView2Proj2 = new JenScript.StockPlugin({
		bearishColor : JenScript.RosePalette.EMERALD,
		bullishColor : JenScript.RosePalette.CORALRED,
	});
	proj22.registerPlugin(stockPluginView2Proj2);

	stockPluginView2Proj2.addLayer(new JenScript.VolumeBarLayer({
		volumeColor : 'rgba(211, 84, 0,0.8)'
	}));
	//
	//rgba(255,130,0,0.7)
//rgba(255,218,227)
	var title = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'Volume',
		fontSize : 10,
		textColor : 'rgba(155,89,182,1)',
		rotate : true,
		rotateAngle : -90,
		xAlign : 'left',
		yAlign : 'center',
		xMargin : 10,
	});
	proj22.registerPlugin(title);
}

function create(container1,container2, width, height) {

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
	createView1Proj3();
	

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
	createView2Proj2();
	
	
	createTranslate();
	createZoomBox();
	createZoomLens();
	
	var loader = new StockLoader(proj1,[2014,2015,2016],function(year,stocks){
		stockPluginView1Proj1.setStocks(stocks);
		stockPluginView1Proj2.setStocks(stocks);
		stockPluginView1Proj3.setStocks(stocks);
		stockPluginView2Proj1.setStocks(stocks);
		stockPluginView2Proj2.setStocks(stocks);
	},{foregroundColor : 'rgba(153, 255, 51,0.5)', outlineColor : 'rgb(255, 255, 0)'});

	view1.setActiveProjection(proj1);
}


function createTranslate(){
	
	 translateView1Proj1 = new JenScript.TranslatePlugin({
			name : 'mainTranslate',
			slaves : [
			          {plugin : stockPluginView1Proj1, direction : 'xy'},
			          {plugin : southMetrics1, direction :'x'},
			          {plugin : westMetrics, direction :'y'},
			          {plugin : eastMetrics, direction :'y'}
			         ]
	});
	proj1.registerPlugin(translateView1Proj1);
	
	translateView1Proj2 = new JenScript.TranslatePlugin({
			name : 'ohlcTranslate',
			slaves : [
			          {plugin : stockPluginView1Proj2 , direction :'xy'}
			         ]
	});
	proj12.registerPlugin(translateView1Proj2);
	
	translateView1Proj3 = new JenScript.TranslatePlugin({
		name : 'bollinger',
		slaves : [
		          {plugin : stockPluginView1Proj3 , direction :'xy'}
		         ]
	});
	proj13.registerPlugin(translateView1Proj3);
	
	
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
	
	
	var toolbarWidget = new JenScript.IconToolBarWidget({
			iconDefs : '/assets/svgdefs.svg',
			iconSize :  20,
			xIndex : 1,
			barOrientation : 'Horizontal',
			outlineFillColor : 'rgba(20,20,20,0.3)',
			outlineStrokeColor : 'rgba(255,255,255,1)',
			outlineStrokeWidth : 0.8,
			buttonFillColor :  'rgba(224,238,238,0.5)',
			buttonRolloverFillColor : 'rgba(173,255,47,1)',
			buttonPressFillColor : 'cyan',
			mode : {paint : {proj : 'always', plugin : 'always'},event: {proj : 'always', plugin : 'always'}}
	});
	
	
	toolbarWidget.addButton({
							icon : 'lnr-pointer-up',
							toggle : true,
							buttonPressFillColor : 'rgba(255,130,0,1)',
							isToggled : function(){
								return translateView1Proj1.isLockSelected();
							},
							press : function(){
								if(translateView1Proj1.isLockSelected()){
									translateView1Proj1.unselect();
								}
								else{
									translateView1Proj1.select();
								}
							},
							
	});
	toolbarWidget.addButton({
							icon : 'lnr-layers', 
							press : function(){
								if(proj1.Id === view1.getActiveProjection().Id){
									view1.setActiveProjection(proj12)
								}else if(proj12.Id === view1.getActiveProjection().Id){
									view1.setActiveProjection(proj13)
								}else if(proj13.Id === view1.getActiveProjection().Id){
									view1.setActiveProjection(proj1)
								}
							}
							
	});
	toolbarWidget.addButton({
							icon : 'lnr-select',
							toggle : true,
							buttonPressFillColor : 'rgba(0,229,238,1)',
							isToggled : function(){
								return boxView1Proj1.isLockSelected();
							},
							press : function(){ 
								if(boxView1Proj1.isLockSelected()){
									boxView1Proj1.unselect();
								}
								else{
									boxView1Proj1.select();
								}
							}

	});
	toolbarWidget.addButton({
							icon : 'lnr-line-spacing',
							toggle : true,
							buttonPressFillColor : 'rgba(0,250,154,1)',
							isToggled : function(){
								return lensView1Proj1.isLockSelected();
							},
							press : function(){ 
								if(lensView1Proj1.isLockSelected()){
									lensView1Proj1.unselect();
								}
								else{
									lensView1Proj1.select();
								}
							}

	});
	
	
	toolbarWidget.addButton({
							icon : 'lnr-camera', 
							press : function(){
								var svg = document.getElementById(view1.Id).outerHTML;
								var formBlob = new Blob([svg], { type: 'image/svg+xml' });
								var reader = new FileReader();
								reader.onload = function(e){
								  window.location.href = reader.result;
								}
								reader.readAsDataURL(formBlob);
							}
	});
	
	translateView1Proj1.registerWidget(toolbarWidget);
	
	
	//view 2
	
	translateView2Proj1 = new JenScript.TranslatePlugin({
		mode:'tx',
		name : 'macdTranslate',
		slaves : [{plugin : stockPluginView2Proj1, direction :'xy'},
		          {plugin : southMetrics2, direction :'x'},
		          {plugin : eastMetrics2, direction :'y'}]
	});
	translateView2Proj1.registerWidget(new JenScript.TranslateCompassWidget({
		ringFillColor : JenScript.RosePalette.AEGEANBLUE,
		ringFillOpacity : 0.7,
		xIndex :0,
	}));
	proj2.registerPlugin(translateView2Proj1);

	translateView2Proj2 = new JenScript.TranslatePlugin({
		mode : 'tx',
		name : 'volume Translate',
		slaves : [
			       {plugin : stockPluginView2Proj2 , direction :'xy'}
			     ]
	});
	proj22.registerPlugin(translateView2Proj2);
	
	var synchronizer = new JenScript.TranslateSynchronizer({
		translates : [ translateView1Proj1,translateView1Proj2,translateView1Proj3, translateView2Proj1,translateView2Proj2 ]
	});
	
}



function createZoomBox(){
	
	boxView1Proj1 = new JenScript.ZoomBoxPlugin({
		name : 'candleBox',
		slaves : [stockPluginView1Proj1]
		});
	boxView1Proj1.registerWidget(new JenScript.ZoomBoxWidget({
		width : 60,
		height :  16,
		xIndex :100,
		yIndex : 0,
		outlineStrokeColor : 'rgba(0,229,238,1)',
		outlineFillColor : 'rgba(0,229,238,0.3)',
		outlineStrokeWidth : 0.8,
		buttonFillColor :  'rgba(0,229,238,0.6)',
		buttonRolloverDrawColor :  'white',
		buttonStrokeWidth : 0.8,
		buttonRolloverFillColor : 'rgba(0,229,238,1)',
		mode : {paint : {proj : 'always', plugin : 'selected'},event: {proj : 'always', plugin : 'always'}}
	}));
	proj1.registerPlugin(boxView1Proj1);
	
	
	boxView1Proj2 = new JenScript.ZoomBoxPlugin({
		name : 'ohlcBox',
		slaves : [stockPluginView1Proj2]
	});
	proj12.registerPlugin(boxView1Proj2);
	
	boxView1Proj3 = new JenScript.ZoomBoxPlugin({
		name : 'bollingerBox',
		slaves : [stockPluginView1Proj2]
	});
	proj13.registerPlugin(boxView1Proj3);
	
	
	//view 2
    boxView2Proj1 = new JenScript.ZoomBoxPlugin({
		mode : 'x',
		name : 'macdBox',
		slaves : [stockPluginView2Proj1]
	});
	proj2.registerPlugin(boxView2Proj1);
	
	
	boxView2Proj2 = new JenScript.ZoomBoxPlugin({
			mode : 'x',
			name : 'volumeBox',
			slaves : [stockPluginView2Proj2]
	});
	proj22.registerPlugin(boxView2Proj2);
	
	var synchronizer = new JenScript.ZoomBoxSynchronizer({
		boxes : [ boxView1Proj1,boxView1Proj2,boxView1Proj3,boxView2Proj1,boxView2Proj2 ]
	});
	
}

var lensView1Proj1;
var lensView1Proj2;
var lensView2Proj1;
function createZoomLens(){
	lensView1Proj1 = new JenScript.ZoomLensPlugin({name : 'mainLens'});
	proj1.registerPlugin(lensView1Proj1);
	
	lensView1Proj2 = new JenScript.ZoomLensPlugin({name : 'secondaryLens'});
	proj12.registerPlugin(lensView1Proj2);
	
	lensView2Proj1 = new JenScript.ZoomLensPlugin({name : 'tertiaryLens'});
	proj2.registerPlugin(lensView2Proj1);
	
	
	var lx = new JenScript.LensX({
		width : 60,
		height :  16,
		xIndex : 100,
		outlineStrokeColor : 'rgba(0,250,154,1)',
		outlineFillColor : 'rgba(0,250,154,0.3)',
		outlineStrokeWidth : 0.8,
		buttonFillColor :  'rgba(0,250,154,0.6)',
		buttonDrawColor :  'rgba(0,250,154,0.6)',
		buttonRolloverDrawColor :  'white',
		buttonStrokeWidth : 2,
		buttonRolloverFillColor : 'rgba(0,250,154,1)',
		mode : {paint : {proj : 'always', plugin : 'selected'},event: {proj : 'always', plugin : 'always'}}
	});
	//0,250,154
	var ly = new JenScript.LensY({
		width : 16,
		height :  60,
		outlineStrokeColor : 'rgba(0,250,154,1)',
		outlineFillColor : 'rgba(0,250,154,0.3)',
		outlineStrokeWidth : 0.8,
		buttonFillColor :  'rgba(0,250,154,0.6)',
		buttonDrawColor :  'rgba(0,250,154,0.6)',
		buttonRolloverDrawColor :  'white',
		buttonStrokeWidth : 2,
		buttonRolloverFillColor : 'rgba(0,250,154,1)',
		mode : {paint : {proj : 'always', plugin : 'selected'},event: {proj : 'always', plugin : 'always'}}
	});
	
	lensView1Proj1.registerWidget(lx);
	lensView1Proj1.registerWidget(ly);
	
	var synchronizer = new JenScript.ZoomLensSynchronizer({
		lenses : [ lensView1Proj1,lensView1Proj2, lensView2Proj1 ]
	});
}

function createDonut2d(container, width, height,title) {

	var view = new JenScript.View({
		name : container,
		width : width,
		height : height,
		holders : 0,
		
	});

	var proj = new JenScript.LinearProjection({
		name : "proj1",
		minX : -1,
		maxX : 1,
		minY : -3,
		maxY : 3
	});
	view.registerProjection(proj);
	
	var title = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : title,
		fontSize : 10,
		textColor : 'white',
		xAlign : 'center',
		yAlign : 'top',
		yMargin : 50,
	});
	proj.registerPlugin(title);


	var donutPlugin = new JenScript.Donut2DPlugin();
	proj.registerPlugin(donutPlugin);
	

	var donut = new JenScript.Donut2D({
			innerRadius : 25, 
			outerRadius : 45, 
			startAngleDegree : 45, 
	});
	donutPlugin.addDonut(donut);
	
	//donutPlugin.translate(1000,0);
	sliceValue = function (){
		return random(20,100);
	}
	var s1 = new JenScript.Donut2DSlice({
		name : "s1",
		value : sliceValue(),
		themeColor : 'rgba(240, 240, 240, 0.9)'
	});
	var s2 = new JenScript.Donut2DSlice({
		name : "s2",
		value : sliceValue(),
		themeColor : 'rgba(37,38,41,1)'
	});
	var s3 = new JenScript.Donut2DSlice({
		name : "s3",
		value : sliceValue(),
		themeColor : 'rgba(78,148,44,1)'
	});
	var s4 = new JenScript.Donut2DSlice({
		name : "s4",
		value : sliceValue(),
		themeColor : 'rgba(22,125,218, 1)'
	});
	var s5 = new JenScript.Donut2DSlice({
		name : "s5",
		value : sliceValue(),
		themeColor : 'rgba(61,44,105,1)'
	});

	donut.addSlice(s1);
	donut.addSlice(s2);
	donut.addSlice(s3);
	donut.addSlice(s4);
	donut.addSlice(s5);
	
	
	donut.setFill(new JenScript.Donut2DRadialFill());
	
	var lef = new JenScript.Donut2DLinearEffect({offsetRadius : 1})
	donut.addEffect(lef);
	

	donut.addEffect(new JenScript.Donut2DReflectionEffect());
	
	
	var l1 = new JenScript.Donut2DRadialLabel({
		text : "Slv",
		fillColor:'rgba(20,20,20,0.3)',
		//outlineColor : 'white',
		cornerRadius : 4,
		//outlineWidth : 2,
		textSize : 8,
		textColor :'white',
		margin : 20
	});
	s1.setSliceLabel(l1);
	
	var l2 = new JenScript.Donut2DRadialLabel({
		text : "Pt",
		fillColor:'rgba(20,20,20,0.3)',
		//outlineColor : 'white',
		cornerRadius : 4,
		//outlineWidth : 2,
		textColor :'white',
		margin : 20
	});
	s2.setSliceLabel(l2);
	
	var l3 = new JenScript.Donut2DRadialLabel({
		text : "Zn",
		fillColor:'rgba(20,20,20,0.3)',
		//outlineColor : 'white',
		cornerRadius : 4,
		//outlineWidth : 2,
		textColor : 'pink',
		margin : 20
	});
	s3.setSliceLabel(l3);
	
	var l4 = new JenScript.Donut2DRadialLabel({
		text : "Pb",
		fillColor:'rgba(20,20,20,0.3)',
		//outlineColor : 'white',
		cornerRadius : 4,
		//outlineWidth : 2,
		textColor : 'yellow',
		margin : 20
	});
	s4.setSliceLabel(l4);
	
	var l5 = new JenScript.Donut2DRadialLabel({
		text : "Sn",
		fillColor:'rgba(20,20,20,0.3)',
		//outlineColor : 'white',
		cornerRadius : 4,
		//outlineWidth : 2,
		textColor : 'yellow',
		margin : 20
	});
	s5.setSliceLabel(l5);
		
}

/**
 * createSymbolBarView
 * 
 * @param container
 * @param width
 * @param height
 */
function createSymbolBarView(container, width, height) {

	var view = new JenScript.View({
		name : container,
		width : width,
		height : height,
		east : 0,
		west : 40,
//		west : 80,
//		east : 80,
//		north : 60,
		south:60
	});
	
	var proj = new JenScript.LinearProjection({
		name : "proj",
		paintMode : 'ACTIVE',
		minX : 0,
		maxX : 0,
		minY : -5,
		maxY : 1200
	});
	
//	var proj = new JenScript.LinearProjection({
//		name : "proj",
//		paintMode : 'ACTIVE',
//
//		minX : -100,
//		maxX : 1200,
//		minY : -0,
//		maxY : 0
//	});
	
	view.registerProjection(proj);

	var outline = new JenScript.DeviceOutlinePlugin({
		color : 'pink'
	});

	//proj.registerPlugin(outline);
	
	var metrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisWest,
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
			tickMarkerColor : JenScript.RosePalette.TURQUOISE,
			tickMarkerStroke : 3,
			tickTextColor : JenScript.RosePalette.TURQUOISE,
			tickTextFontSize : 12
		}
	});
	proj.registerPlugin(metrics);
	
	var gridPlugin = new JenScript.GridModeledPlugin({
		gridOrientation : 'Horizontal',
		gridColor : 'white',
		gridWidth : 0.5,
		gridOpacity : 0.5
	});
	proj.registerPlugin(gridPlugin);
	
	//TOOL
	var tx1 = new JenScript.TranslatePlugin({
		mode : 'ty',
	});
	proj.registerPlugin(tx1);
	tx1.registerWidget(new JenScript.TranslateCompassWidget({
		ringFillColor : 'pink'
	}));
	tx1.select();
	
	var zoomwheel = new JenScript.ZoomWheelPlugin({
		mode : 'wheelY'
	});
	proj.registerPlugin(zoomwheel);
	
	var symbolPlugin = new JenScript.SymbolPlugin({
		nature : 'Vertical'
	});
	proj.registerPlugin(symbolPlugin);
	
	// arbitrary values between min max values
	
	
	barValue = function (){
		return random(200,800);
	}
	
	stackValue = function (){
		return random(20,60);
	}
	
	var iname= 0;
	//symbol factory
	var createBar = function(val){
		var symbol = new JenScript.SymbolBarStacked({
			name : "Symbol "+iname++,
			base : 0,
			value: val,
			thickness : 10,
			direction : 'ascent',
			morpheStyle : 'Rectangle',
			round : 2,
			themeColor : JenScript.RosePalette.MANDARIN,
			opacity : 1,
			barFill : new JenScript.SymbolBarFill0({}),
			barEffect  : new JenScript.SymbolBarEffect0({}),
		});
		
//		var label1 = new JenScript.SymbolDefaultLabel({
//			part : 'East',
//			text : symbol.name,
//			textColor : 'red',
//			paintType : 'None',
//			rotate : true,
//			rotateAngle : -45,
//		});
		var label2 = new JenScript.SymbolAxisLabel({
			part : 'Device',
			text : symbol.name,
			textColor : 'yellow',
			paintType : 'None',
			rotateAngle : -90,
		});
		
		//symbol.setBarLabel(label1);
		//symbol.setBarLabel(label2);
		
		
		var  s1 = new JenScript.SymbolStack({
			name : symbol.name+' stack1 ',
			themeColor : JenScript.RosePalette.CALYPSOBLUE,
			stackValue : stackValue()
		});
		var  s2 = new JenScript.SymbolStack({
			name : symbol.name+' stack2',
			themeColor : JenScript.RosePalette.NEPTUNE,
			stackValue : stackValue()
		});
		var  s3 = new JenScript.SymbolStack({
			name : symbol.name+' stack3',
			themeColor : JenScript.RosePalette.AEGEANBLUE,
			stackValue : stackValue()
		});
		
		symbol.addStack(s1);
		symbol.addStack(s2);
		symbol.addStack(s3);
		
		return symbol;
	}
	
	//layer
	var barLayer = new JenScript.SymbolBarLayer();
	symbolPlugin.addLayer(barLayer);
	

	
	//lay out
	barLayer.addSymbol(JenScript.SymbolFiller.createGlue(),false); //glue stretch
	//barLayer.addSymbol(JenScript.SymbolFiller.createStrut(10));
	for (var i = 1; i <= 18; i++) {
		var bar = createBar(barValue());
		barLayer.addSymbol(bar,false);
		
		if(i < 18)
		barLayer.addSymbol(JenScript.SymbolFiller.createStrut(2),false); //glue rigid except after last bar
	}
	barLayer.addSymbol(JenScript.SymbolFiller.createGlue(),false);//glue stretch
	
	//invoke repaint only one time
	symbolPlugin.repaintPlugin();
	
	//listener
	barLayer.addSymbolListener('enter',function(event){
		//event is something like, refer to source
		//event : {symbol : bar, x:x,y:y, device :{x:x,y:y}}
		
		//console.log('symbol enter');
	},'this demo');
	
	//listener
	barLayer.addSymbolListener('exit',function(event){
		//event is something like, refer to source
		//event : {symbol : bar, x:x,y:y, device :{x:x,y:y}}
		
		//console.log('symbol exit');
	},'this demo');
	
	//listener
	barLayer.addSymbolListener('move',function(event){
		//event is something like, refer to source
		//event : {symbol : bar, x:x,y:y, device :{x:x,y:y}}
		
		//console.log('symbol move');
	},'this demo');
	
	//listener
	barLayer.addSymbolListener('press',function(event){
		//event is something like, refer to source
		//event : {symbol : bar, x:x,y:y, device :{x:x,y:y}}
		
		//console.log('symbol press');
	},'this demo');
	
	//listener
	barLayer.addSymbolListener('release',function(event){
		//event is something like, refer to source
		//event : {symbol : bar, x:x,y:y, device :{x:x,y:y}}
		
		//console.log('symbol release');
	},'this demo');
}



/**
 * createSymbolBarView
 * 
 * @param container
 * @param width
 * @param height
 */
function createSymbolBarView2(container, width, height) {

	var view = new JenScript.View({
		name : container,
		width : width,
		height : height,
//		holders : 0,
//		west : 80,
//		east : 80,
//		north : 60,
		south:60
	});
	

	
	var proj = new JenScript.LinearProjection({
		name : "proj",
		paintMode : 'ACTIVE',

		minX : -100,
		maxX : 1200,
		minY : -0,
		maxY : 0
	});
	
	view.registerProjection(proj);

	var outline = new JenScript.DeviceOutlinePlugin({
		color : 'pink'
	});

	//proj.registerPlugin(outline);
	
	var metrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisSouth,
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
			tickMarkerColor : JenScript.RosePalette.TURQUOISE,
			tickMarkerStroke : 3,
			tickTextColor : JenScript.RosePalette.TURQUOISE,
			tickTextFontSize : 12
		}
	});
	proj.registerPlugin(metrics);
	
	var gridPlugin = new JenScript.GridModeledPlugin({
		gridOrientation : 'Vertical',
		gridColor : 'white',
		gridWidth : 0.5,
		gridOpacity : 0.5
	});
	proj.registerPlugin(gridPlugin);
	
	//TOOL
	var tx1 = new JenScript.TranslatePlugin({
		mode : 'tX',
	});
	proj.registerPlugin(tx1);
	tx1.registerWidget(new JenScript.TranslateCompassWidget({
		ringFillColor : 'pink'
	}));
	tx1.select();
	
	var zoomwheel = new JenScript.ZoomWheelPlugin({
		mode : 'wheelX'
	});
	proj.registerPlugin(zoomwheel);
	
	var symbolPlugin = new JenScript.SymbolPlugin({
		nature : 'Horizontal'
	});
	proj.registerPlugin(symbolPlugin);
	
	// arbitrary values between min max values
	var random = function getRandomArbitrary(min, max) {
	  return Math.random() * (max - min) + min;
	}
	
	baseValue = function (){
		return random(0,200);
	}
	
	barValue = function (){
		return random(200,800);
	}
	
	stackValue = function (){
		return random(20,60);
	}
	
	var iname= 0;
	//symbol factory
	var createBar = function(val){
		var symbol = new JenScript.SymbolBarStacked({
			name : "Symbol "+iname++,
			base : baseValue(),
			value: barValue(),
			thickness : 6,
			direction : 'ascent',
			morpheStyle : 'Rectangle',
			round : 3,
			themeColor : JenScript.RosePalette.MANDARIN,
			opacity : 1,
			barFill : new JenScript.SymbolBarFill0({}),
			//barStroke : new JenScript.SymbolBarStroke({strokeColor : 'white', strokeWidth : 0.5}),
			//barEffect  : new JenScript.SymbolBarEffect0({}),
		});
		
//		var label1 = new JenScript.SymbolDefaultLabel({
//			part : 'East',
//			text : symbol.name,
//			textColor : 'red',
//			paintType : 'None',
//			rotate : true,
//			rotateAngle : -45,
//		});
		var label2 = new JenScript.SymbolAxisLabel({
			part : 'Device',
			text : symbol.name,
			textColor : 'yellow',
			paintType : 'None',
			rotateAngle : -90,
		});
		
		//symbol.setBarLabel(label1);
		symbol.setAxisLabel(label2);
		
		
		var  s1 = new JenScript.SymbolStack({
			name : symbol.name+' stack1 ',
			themeColor : JenScript.RosePalette.CALYPSOBLUE,
			stackValue : stackValue()
		});
		var  s2 = new JenScript.SymbolStack({
			name : symbol.name+' stack2',
			themeColor : JenScript.RosePalette.NEPTUNE,
			stackValue : stackValue()
		});
		var  s3 = new JenScript.SymbolStack({
			name : symbol.name+' stack3',
			themeColor : JenScript.RosePalette.AEGEANBLUE,
			stackValue : stackValue()
		});
		
		symbol.addStack(s1);
		symbol.addStack(s2);
		symbol.addStack(s3);
		
		return symbol;
	}
	
	//layer
	var barLayer = new JenScript.SymbolBarLayer();
	symbolPlugin.addLayer(barLayer);
	

	
	//lay out
	barLayer.addSymbol(JenScript.SymbolFiller.createGlue(),false); //glue stretch
	barLayer.addSymbol(JenScript.SymbolFiller.createStrut(10));
	for (var i = 1; i <= 18; i++) {
		var bar = createBar();
		barLayer.addSymbol(bar,false);
		
		if(i < 18)
		barLayer.addSymbol(JenScript.SymbolFiller.createStrut(2),false); //glue rigid except after last bar
	}
	barLayer.addSymbol(JenScript.SymbolFiller.createGlue(),false);//glue stretch
	
	//invoke repaint only one time
	symbolPlugin.repaintPlugin();
	
}




