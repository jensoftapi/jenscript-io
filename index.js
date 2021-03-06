
var view1, view2;
var projCandle, proj12, proj13, proj2, proj22, projPie, projMap, projBar;
var stockPluginView1Proj1, stockPluginView1Proj2, stockPluginView1Proj3, stockPluginView2Proj1, stockPluginView2Proj2;
var translateView1Proj1, translateView1Proj2, translateView2Proj3, translateView2Proj1, translateView2Proj2;
var boxView1Proj1, boxView1Proj2, boxView1Proj3, boxView2Proj1, boxView2Proj2;

var startDate = new Date(2014, 11, 6);
var endDate = new Date(2015, 03, 6);

var southMetrics1;
var westMetrics;
var eastMetrics;

var southMetrics2;
var eastMetrics2;

var lensView1Proj1;
var lensView1Proj2;
var lensView1Proj3;
var lensView2Proj1;
var lensView2Proj2;

var minor = {
		tickMarkerSize : 2,
		tickMarkerColor : 'cyan',
		tickMarkerStroke : 0.8
};
var median = {
	tickMarkerSize : 6,
	tickMarkerColor : '#1abc9c',
	tickMarkerStroke : 2,
	tickTextColor : '#1abc9c',
	tickTextFontSize : 10,
	tickTextOffset : 6
};
var major = {
	tickMarkerSize : 8,
	tickMarkerColor : '#e67e22',
	tickMarkerStroke : 2,
	tickTextColor : 'cyan',
	tickTextFontSize : 11,
	tickTextOffset : 6
};


var minor2 = {
		tickMarkerSize : 2,
		tickMarkerColor : '#9b59b6',
		tickMarkerStroke : 0.8
};
var median2 = {
	tickMarkerSize : 8,
	tickMarkerColor : '#9b59b6',
	tickMarkerStroke : 2,
	tickTextColor : '#9b59b6',
	tickTextFontSize : 10,
	tickTextOffset : 14
};
var major2 = {
	tickMarkerSize : 12,
	tickMarkerColor : '#e74c3c',
	tickMarkerStroke : 2,
	tickTextColor : '#e74c3c',
	tickTextFontSize : 12,
	tickTextOffset : 18
};

function createView1Proj1() {
	projCandle = new JenScript.TimeXProjection({
		name : "candleStick proj",
		minXDate : startDate,
		maxXDate : endDate,
		minY : 12.5,
		maxY : 18.8,
		policy : {paint : 'ALWAYS'}
	});
	view1.registerProjection(projCandle);
	
	var outline = new JenScript.DeviceOutlinePlugin({color : '#1abc9c', strokeOpacity : 0.8, strokeWidth : 1});
	projCandle.registerPlugin(outline);
	
	
	 southMetrics1 = new JenScript.AxisMetricsTiming({
		axis : JenScript.Axis.AxisSouth,
		models : [new JenScript.HourModel({}),new JenScript.DayModel({}),new JenScript.MonthModel({}), new JenScript.YearModel({})],
		minor : minor,
		median:median,
		major:major
	});
	projCandle.registerPlugin(southMetrics1);
	
	
	 westMetrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisWest,
		minor : minor,
		median:median,
		major:major
	});
	projCandle.registerPlugin(westMetrics);
	
	 eastMetrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisEast,
		minor : minor,
		median:median,
		major:major,
		
	});
	projCandle.registerPlugin(eastMetrics);
	
	var mme12Legend = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'MME 12',
		fontSize : 10,
		textColor : '#e67e22',
		xAlign : 'left',
		yAlign : 'bottom',
	});
	projCandle.registerPlugin(mme12Legend);
	var mme26Legend = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'MME 26',
		fontSize : 10,
		textColor : '#1abc9c',
		xAlign : 'left',
		yAlign : 'bottom',
		yMargin: 18
	});
	projCandle.registerPlugin(mme26Legend);
	
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
	projCandle.registerPlugin(titleLegend);
	
	var dateLegend = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.North,
		text   : new Date().toString(),
		fontSize : 8,
		textColor : 'pink',
		xAlign : 'center',
		yAlign : 'bottom',
	});
	projCandle.registerPlugin(dateLegend);
	
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
	projCandle.registerPlugin(dateLegend);
	
	stockPluginView1Proj1 = new JenScript.StockPlugin({
		name : 'StockPluginCandleStick',
		bearishColor : 'rgba(231, 76, 60,0.8)',
		bullishColor : 'rgba(52, 152, 219,0.8)',
	});
	projCandle.registerPlugin(stockPluginView1Proj1);
	
	
	candles = new JenScript.CandleStickLayer({
		lowHighColor : 'rgba(250,250,250,0.5)'
	});
	
	stockPluginView1Proj1.addLayer(candles);
	
	stockPluginView1Proj1.addLayer(new JenScript.StockExponentialMovingAverageLayer({name : 'layer mme 12',moveCount:12,curveColor:'#e67e22',curveOpacity : 0.7}));
	stockPluginView1Proj1.addLayer(new JenScript.StockExponentialMovingAverageLayer({name : 'layer mme 26',moveCount:26,curveColor:'#1abc9c',curveOpacity : 0.7}));
	
	var tooltip = new JenScript.Tooltip({
		text : "",
		fontSize : 12,
		textColor : 'white',
		width : 120,
		outlineColor : 'white',
		fillColor : 'black',
		arrowAnchor : { x : 250, y : 160},
		visible :false,
		position : 'bottom',
	});
	
	var tooltipPlugin = new JenScript.TooltipPlugin({tooltip : tooltip});
	
	projCandle.registerPlugin(tooltipPlugin);
	var updateText = function( point, stock) {
		tooltip.setVisible(true);
		if(stock.isBearish()){tooltip.setFillColor('rgba(231, 76, 60,0.8)')};
		if(stock.isBullish()){tooltip.setFillColor('rgba(52, 152, 219,0.8)')};
		tooltip.setText(stock.fixing.toDateString()+", Dollar(USD) open:"+stock.open+"$, close:"+stock.close+'$, Volume:'+stock.volume);
		tooltip.setArrowAnchor({ x : point.x, y : point.y});
		tooltipPlugin.repaintPlugin();
	};
	
	var removeText = function() {
		tooltip.setVisible(false);
		tooltipPlugin.repaintPlugin();
	};
	
	candles.addStockListener('enter',function(event){
	},'this demo');
	
	candles.addStockListener('exit',function(event){
		removeText();
	},'this demo');
	
	candles.addStockListener('move',function(event){
	},'this demo');
	
	candles.addStockListener('press',function(event){
		updateText(event.device, event.stock);
	},'this demo');
	
	candles.addStockListener('release',function(event){
		removeText();
	},'this demo');
}

function createView1Proj2() {
	proj12 = new JenScript.TimeXProjection({
		name : "ohlc proj",
		minXDate : startDate,
		maxXDate : endDate,
		minY : 12.5,
		maxY : 18.8,
		policy : {paint : 'ACTIVE'}
	});
	view1.registerProjection(proj12);
	
	var outline12 = new JenScript.DeviceOutlinePlugin({color : '#ffb6c1', strokeOpacity : 0.8, strokeWidth : 1});
	proj12.registerPlugin(outline12);
	
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
		name : 'StockPluginOHLC',
		bearishColor : 'rgba(231, 76, 60,0.8)',
		bullishColor : 'rgba(52, 152, 219,0.8)',
	});
	proj12.registerPlugin(stockPluginView1Proj2);
	
	stockPluginView1Proj2.addLayer(new JenScript.OhlcLayer({
		markerColor : 'cyan',
		markerWidth : 1.5
	}));
	
}

function createView1Proj3() {
	proj13 = new JenScript.TimeXProjection({
		name : "bollinger proj",
		minXDate : startDate,
		maxXDate : endDate,
		minY : 12.5,
		maxY : 18.8,
		policy : {paint : 'ACTIVE'}
	});
	view1.registerProjection(proj13);
	
	proj13.addProjectionListener('lockActive', function(){
		projCandle.setVisible(true);
	},'');
	
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
		name : 'StockPluginBollinger',
	});
	proj13.registerPlugin(stockPluginView1Proj3);
	
	stockPluginView1Proj3.addLayer(new JenScript.StockBollingerLayer({
		bandColor:'#ecf0f1',
		bandOpacity: 0.12,
		lineColor:'#ecf0f1',
		lineOpacity: 1,
		lineWidth : 0.6
	}));
	
}


function createView2Proj1() {
	
	 proj2 = new JenScript.TimeXProjection({
		cornerRadius : 6,
		name : "macd proj",
		minXDate : startDate,
		maxXDate : endDate,
		minY : -1.5,
		maxY : 1.5,
		policy : {paint : 'ALWAYS'}
	});
	view2.registerProjection(proj2);
	
	var outline2 = new JenScript.DeviceOutlinePlugin({color : '#3498db', strokeOpacity : 0.8, strokeWidth : 1});
	proj2.registerPlugin(outline2);
	
	var minor3 = {
			tickMarkerSize : 2,
			tickMarkerColor : '#9b59b6',
			tickMarkerStroke : 0.8
	};
	var median3 = {
		tickMarkerSize : 8,
		tickMarkerColor : '#3498db',
		tickMarkerStroke : 2,
		tickTextColor : '#3498db',
		tickTextFontSize : 10,
		tickTextOffset : 14
	};
	var major3 = {
		tickMarkerSize : 12,
		tickMarkerColor : '#2ecc71',
		tickMarkerStroke : 2,
		tickTextColor : '#2ecc71',
		tickTextFontSize : 12,
		tickTextOffset : 18
	};
	
	
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
		minor : minor3,
		median:median3,
		major:major3,
		
	});
	proj2.registerPlugin(eastMetrics2);
	
	stockPluginView2Proj1 = new JenScript.StockPlugin();
	proj2.registerPlugin(stockPluginView2Proj1);
	stockPluginView2Proj1.addLayer(new JenScript.StockMACDLayer({
		moveCountSignal:9,
		moveCountMin:12,
		moveCountMax:26,
		lineColor:'white',
		lineOpacity:1,
		lineWidth:1,
		
		macdColor:'#3498db',
		signalColor:'#2ecc71',
	}));
	
	var legend1 = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'MACD (12-26-9)',
		fontSize : 10,
		textColor : '#e74c3c',
		xAlign : 'left',
		yAlign : 'top',
		yMargin: 60
	});
	proj2.registerPlugin(legend1);
	
	var legend2 = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'Signal MME 9',
		fontSize : 10,
		textColor : '#2ecc71',
		xAlign : 'right',
		yAlign : 'bottom',
		yMargin: 38
	});
	proj2.registerPlugin(legend2);
	var legend3 = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'MACD (12/26)',
		fontSize : 10,
		textColor : '#3498db',
		xAlign : 'right',
		yAlign : 'bottom',
		yMargin: 50
	});
	proj2.registerPlugin(legend3);
}

function createView2Proj2() {
	
	 proj22 = new JenScript.TimeXProjection({
		cornerRadius : 6,
		name : "volume proj",
		minXDate : startDate,
		maxXDate : endDate,
		minY : 0,
		maxY : 100000000,
		policy : {paint : 'ALWAYS'}
	});
	view2.registerProjection(proj22);
	
	var outline = new JenScript.DeviceOutlinePlugin({color : 'rgba(230, 126, 34,0.6)'});
	proj22.registerPlugin(outline);
	
	var minorv = {
		tickMarkerColor : 'rgba(26, 188, 156,0.8)',
	};
	var medianv = {
		tickTextColor : 'rgba(230, 126, 34,0.8)',
	};
	var majorv = {
		tickTextColor : 'rgba(26, 188, 156,0.8)',
	};

	
	var westMetrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisWest,
		minor:minorv,
		median:medianv,
		major:majorv,
		gravity : 'rotate'
	});
	proj22.registerPlugin(westMetrics);


	stockPluginView2Proj2 = new JenScript.StockPlugin({
		name : 'StockPluginVolume',
	});
	proj22.registerPlugin(stockPluginView2Proj2);

	stockPluginView2Proj2.addLayer(new JenScript.VolumeBarLayer({
		
		bearishColor : 'rgba(230, 126, 34,0.8)',
		bullishColor : 'rgba(26, 188, 156,0.8)',
	}));

	var title = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'Bullish Volume',
		fontSize : 10,
		textColor : 'rgba(26, 188, 156,0.8)',
		rotate : true,
		rotateAngle : 90,
		xAlign : 'left',
		yAlign : 'bottom',
		xMargin : 20,
		yMargin : 64
	});
	proj22.registerPlugin(title);
	var title = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'Bearish Volume',
		fontSize : 10,
		textColor : 'rgba(230, 126, 34,0.8)',
		rotate : true,
		rotateAngle : 90,
		xAlign : 'left',
		yAlign : 'bottom',
		xMargin : 10,
		yMargin : 60
	});
	proj22.registerPlugin(title);
}

function create(container1,container2, width, height) {

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
	createPie();
	createViewMapLabel();
	createSymbolBarView();
	
	createTranslate();
	createZoomBox();
	createZoomLens();
	
	var loader = new StockLoader(projCandle,[2014,2015,2016],function(year,stocks){
		//console.log("add year : "+year+" for total stocks "+stocks.length);
		stockPluginView1Proj1.setStocks(stocks);
		stockPluginView1Proj2.setStocks(stocks);
		stockPluginView1Proj3.setStocks(stocks);
		stockPluginView2Proj1.setStocks(stocks);
		stockPluginView2Proj2.setStocks(stocks);
	},{foregroundColor : 'rgba(153, 255, 51,0.5)', outlineColor : 'rgb(255, 255, 0)'});

	view1.setActiveProjection(projCandle);
	view2.setActiveProjection(proj2);
	translateView1Proj1.select();
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
	projCandle.registerPlugin(translateView1Proj1);
	
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
						    tooltip : new JenScript.Tooltip({
								text : "Lock and Unlock Translate",
								fontSize : 10,
								textColor : 'white',
								width : 200,
								//outlineColor : 'white',
								fillColor : 'rgba(255,130,0,0.5)',
								position : 'top',
								lengthRatio : 0.8
							})
							
	});
	toolbarWidget.addButton({
							icon : 'lnr-layers', 
							press : function(){
								if(projCandle.Id === view1.getActiveProjection().Id){
									view1.setActiveProjection(proj12)
								}else if(proj12.Id === view1.getActiveProjection().Id){
									view1.setActiveProjection(proj13)
								}else if(proj13.Id === view1.getActiveProjection().Id){
									view1.setActiveProjection(projCandle)
								}
								
							},
							tooltip : new JenScript.Tooltip({
									text : "Switch projections layers",
									fontSize : 10,
									textColor : 'white',
									width : 200,
									//outlineColor : 'white',
									fillColor : 'rgba(173,255,47,0.5)',
									position : 'top',
									lengthRatio : 0.7
							})
							
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
							},
							tooltip : new JenScript.Tooltip({
								text : "Lock/Unlock Zoom Box",
								fontSize : 10,
								textColor : 'white',
								width : 200,
								//outlineColor : 'white',
								fillColor : 'rgba(0,229,238,0.5)',
								position : 'top',
								lengthRatio : 0.5
							})

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
							},
							tooltip : new JenScript.Tooltip({
									text : "Lock/Unlock Zoom Lens",
									fontSize : 10,
									textColor : 'white',
									width : 200,
									//outlineColor : 'white',
									fillColor : 'rgba(0,250,154,0.5)',
									position : 'top',
									lengthRatio : 0.4
							})

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
							},
							 tooltip : new JenScript.Tooltip({
									text : "Capture view as SVG file",
									fontSize : 10,
									textColor : 'white',
									width : 200,
									//outlineColor : 'white',
									fillColor : 'rgba(173,255,47,0.5)',
									position : 'top',
									lengthRatio : 0.3
								})
	});
	
	translateView1Proj1.registerWidget(toolbarWidget);
	
	translateView2Proj1 = new JenScript.TranslatePlugin({
		mode:'tx',
		name : 'macdTranslate',
		slaves : [{plugin : stockPluginView2Proj1, direction :'xy'},
		          {plugin : southMetrics2, direction :'x'},
		          {plugin : eastMetrics2, direction :'y'}]
	});
	translateView2Proj1.registerWidget(new JenScript.TranslateCompassWidget({
		ringFillColor : '#2ecc71',
		ringFillOpacity : 0.7,
		xIndex :100,
		mode : {paint : {proj : 'always', plugin : 'selected'},event: {proj : 'always', plugin : 'always'}}
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
		zoomBoxDrawColor : '#ecf0f1' ,
		zoomBoxFillColor : '#34495e',
		zoomBoxStroke : 1,
	    zoomBoxFillOpacity :  0.3,
	    zoomBoxStrokeOpacity : 1,
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
	projCandle.registerPlugin(boxView1Proj1);
	
	
	boxView1Proj2 = new JenScript.ZoomBoxPlugin({
		name : 'ohlcBox',
		zoomBoxDrawColor : '#ecf0f1' ,
		zoomBoxFillColor : '#34495e',
		zoomBoxStroke : 1,
	    zoomBoxFillOpacity :  0.3,
	    zoomBoxStrokeOpacity : 1,
		slaves : [stockPluginView1Proj2]
	});
	proj12.registerPlugin(boxView1Proj2);
	
	boxView1Proj3 = new JenScript.ZoomBoxPlugin({
		name : 'bollingerBox',
		zoomBoxDrawColor : '#ecf0f1' ,
		zoomBoxFillColor : '#34495e',
		zoomBoxStroke : 1,
	    zoomBoxFillOpacity :  0.3,
	    zoomBoxStrokeOpacity : 1,
		slaves : [stockPluginView1Proj2]
	});
	proj13.registerPlugin(boxView1Proj3);
	
    boxView2Proj1 = new JenScript.ZoomBoxPlugin({
		mode : 'x',
		name : 'macdBox',
		zoomBoxDrawColor : '#ecf0f1' ,
		zoomBoxFillColor : '#34495e',
		zoomBoxStroke : 1,
	    zoomBoxFillOpacity :  0.3,
	    zoomBoxStrokeOpacity : 1,
		slaves : [stockPluginView2Proj1]
	});
	proj2.registerPlugin(boxView2Proj1);
	
	boxView2Proj2 = new JenScript.ZoomBoxPlugin({
			mode : 'x',
			name : 'volumeBox',
			zoomBoxDrawColor : '#ecf0f1' ,
			zoomBoxFillColor : '#34495e',
			zoomBoxStroke : 1,
		    zoomBoxFillOpacity :  0.3,
		    zoomBoxStrokeOpacity : 1,
			slaves : [stockPluginView2Proj2]
	});
	proj22.registerPlugin(boxView2Proj2);
	
	var synchronizer = new JenScript.ZoomBoxSynchronizer({
		boxes : [ boxView1Proj1,boxView1Proj2,boxView1Proj3,boxView2Proj1,boxView2Proj2 ]
	});
	
}

function createZoomLens(){
	
	lensView1Proj1 = new JenScript.ZoomLensPlugin({name : 'v1-candle-lens'});
	projCandle.registerPlugin(lensView1Proj1);
	
	lensView1Proj2 = new JenScript.ZoomLensPlugin({name : 'v1-ohlc-lens'});
	proj12.registerPlugin(lensView1Proj2);
	
	lensView1Proj3 = new JenScript.ZoomLensPlugin({name : 'v1-bollinger-lens'});
	proj13.registerPlugin(lensView1Proj3);
	
	lensView2Proj1 = new JenScript.ZoomLensPlugin({name : 'v2-macd-lens'});
	proj2.registerPlugin(lensView2Proj1);

	lensView2Proj2 = new JenScript.ZoomLensPlugin({
			name : 'v2-volume-lens',
			lensType : 'LensX'
	});
	proj22.registerPlugin(lensView2Proj2);
	
	
	
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
		buttonStrokeWidth : 1,
		buttonRolloverFillColor : 'rgba(0,250,154,1)',
		mode : {paint : {proj : 'always', plugin : 'selected'},event: {proj : 'always', plugin : 'always'}}
	});

	var ly = new JenScript.LensY({
		width : 16,
		height :  60,
		outlineStrokeColor : 'rgba(0,250,154,1)',
		outlineFillColor : 'rgba(0,250,154,0.3)',
		outlineStrokeWidth : 0.8,
		buttonFillColor :  'rgba(0,250,154,0.6)',
		buttonDrawColor :  'rgba(0,250,154,0.6)',
		buttonRolloverDrawColor :  'white',
		buttonStrokeWidth : 1,
		buttonRolloverFillColor : 'rgba(0,250,154,1)',
		mode : {paint : {proj : 'always', plugin : 'selected'},event: {proj : 'always', plugin : 'always'}}
	});
	
	lensView1Proj1.registerWidget(lx);
	lensView1Proj1.registerWidget(ly);
	
	var synchronizer = new JenScript.ZoomLensSynchronizer({
		lenses : [ lensView1Proj1,lensView1Proj2,lensView1Proj3, lensView2Proj1,lensView2Proj2 ]
	});
}

function createPie(){
	var builder = JenScript.view({
		view : view2
	}).projection('linear',{
		name : "pie proj",
		minX : -1,
		maxX : 1,
		minY : -1,
		maxY : 1,
		policy : {paint : 'ACTIVE'}
	}).pie({
		radius : 60,
		startAngleDegree : 45
	}).slice({
		name : "s1",
		value : 45,
		themeColor : 'rgba(240, 240, 240, 0.9)',
	}).label('radial',{
		text : "Silver",
		fillColor:'black',
		outlineColor : 'rgba(240, 240, 240, 0.9)',
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :'rgba(240, 240, 240, 0.9)',
	}).slice({
		name : "s2",
		value : 5,
		themeColor : '#e67e22'
	}).label('radial',{
		text : "Platinium",
		fillColor:'black',
		outlineColor : '#e67e22',
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :'#e67e22',
	}).slice({
		name : "s3",
		value : 30,
		themeColor : '#16a085'
	}).label('radial',{
		text : "Rhodium",
		fillColor:'black',
		outlineColor : '#16a085',
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :'#16a085',
	}).slice({
		name : "s4",
		value : 5,
		themeColor : '#3498db',
		divergence : 30,
	}).label('border',{
		text : "Chrome",
		fillColor:'black',
		outlineColor : '#3498db',
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :'#3498db',
		margin : 100
	}).slice({
		name : "s5",
		value : 5,
		themeColor : '#9b59b6'
	}).label('radial',{
		text : "Uranium",
		fillColor:'black',
		outlineColor : '#9b59b6',
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :'#9b59b6'
	}).effect('linear',{offset : 0,incidence : 300}).effect('reflection');

	projPie = builder.projection();
	projPie.addProjectionListener('lockActive', function(){
		proj22.setVisible(false);
		proj2.setVisible(false);
	},'');
	
	var outline = new JenScript.DeviceOutlinePlugin({
		color : 'pink'
	});
	projPie.registerPlugin(outline);
	
	var title = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'Mining production',
		fontSize : 14,
		textColor : 'pink',
		xAlign : 'left',
		yAlign : 'bottom',
		xMargin : 5,
		yMargin : 5
	});
	projPie.registerPlugin(title);
}

function createViewMapLabel() {
	
	projMap = new JenScript.MapProjection({
		name : 'map proj',
		level : 1,
		policy : {paint : 'ACTIVE', event : 'ACTIVE'},
	});
	view2.registerProjection(projMap);
	
	projMap.addProjectionListener('lockActive', function(){
		proj2.setVisible(false);
		proj22.setVisible(false);
		projBar.setVisible(true);
	},'');
	
	var geojsonPlugin = new JenScript.GeoJSONPlugin();
    projMap.registerPlugin(geojsonPlugin);
	
	var transform = new JenScript.AffineTranformPlugin({
		slaves : [geojsonPlugin]
	});
	projMap.registerPlugin(transform);

	geojsonPlugin.addGeoListener('register', function(event){
		var feature = event.feature;
			feature.fillColor   = '#ecf0f1';
			feature.fillOpacity = 0.2;
			feature.strokeColor = '#ecf0f1';
			feature.strokeWidth = 0;
			
			var country = feature.getProperty('sovereignt');
			if(country === 'Chile' || 
					country === 'Mexico' || 
					country === 'Peru' || 
					country === 'Poland' || 
					country === 'Canada' || 
					country === 'Bolivia'){
				feature.fillOpacity = 0.6;
				feature.fillColor   = '#ecf0f1';
			}
	},'');
	

	var outline = new JenScript.DeviceOutlinePlugin({
		color : 'pink'
	});
	projMap.registerPlugin(outline);
	
	geojsonPlugin.addGeoListener('press', function(event){
	},'map demo');
	
	geojsonPlugin.addGeoListener('release', function(event){
	},'map demo');
	
	geojsonPlugin.addGeoListener('enter', function(event){
		var remote = event.remote;
		remote.fill('#2980b9');
		remote.fillOpacity(1);
		remote.stroke('none');
	},'');
	
	geojsonPlugin.addGeoListener('exit', function(event){
		var remote = event.remote;
		var feature = event.feature;
		remote.fill('#ecf0f1');
		var country = feature.getProperty('sovereignt');
		if(country === 'Chile' || 
				country === 'Mexico' || 
				country === 'Peru' || 
				country === 'Poland' || 
				country === 'Canada' || 
				country === 'Bolivia'){
			remote.fillOpacity(0.6);
			remote.stroke('none');
		}else{
			remote.fillOpacity(0.2);
			remote.stroke('none');
		}
	},'');

	var dataWorker = new Worker('/jenscript/charts/samples/map/DataWorker.js');
	dataWorker.addEventListener("message", function(event) {
		var geoJSON = JSON.parse(event.data);
		geojsonPlugin.addGeoJSON(geoJSON);
	}, false);
	dataWorker.postMessage({asset : 'countries.geojson'});
}

function createSymbolBarView() {
	 projBar = new JenScript.LinearProjection({
		name : "projBar",
		policy : { paint : 'ACTIVE'},
		minX : 0,
		maxX : 0,
		minY : 2,
		maxY : 2000
	});
	view2.registerProjection(projBar);
	
	projBar.addProjectionListener('lockActive', function(){
		proj2.setVisible(false);
		proj22.setVisible(false);
		projMap.setVisible(true);
	},'');

	var outline = new JenScript.DeviceOutlinePlugin({
		color : 'pink'
	});

	projBar.registerPlugin(outline);
	
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
			tickTextFontSize : 10
		};
		var major = {
			tickMarkerSize : 8,
			tickMarkerColor : '#3498db',
			tickMarkerStroke : 3,
			tickTextColor : '#3498db',
			tickTextFontSize : 12
		};
		
	var metrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisWest,
		minor : minor,
		median : median,
		major : major
	});
	projBar.registerPlugin(metrics);
	
	var gridPlugin = new JenScript.GridModeledPlugin({
		gridOrientation : 'Horizontal',
		gridColor : 'white',
		gridWidth : 0.5,
		gridOpacity : 0.5
	});
	projBar.registerPlugin(gridPlugin);
	
	var symbolPlugin = new JenScript.SymbolPlugin({
		nature : 'Vertical'
	});
	projBar.registerPlugin(symbolPlugin);
	
	var random = function getRandomArbitrary(min, max) {
	  return Math.random() * (max - min) + min;
	}
	
	barValue = function (){
		return random(200,800);
	}
	
	stackValue = function (){
		return random(20,60);
	}
	
	var count = 1;
	
	var createBar = function(val){
		var symbol = new JenScript.SymbolBarStacked({
			name : 'Symbol'+count,
			base : 0,
			value: val,
			thickness : 8,
			direction : 'ascent',
			morpheStyle : 'Rectangle',
			themeColor : '#c0392b',
			opacity : 0.6,
			barStroke : new JenScript.SymbolBarStroke({strokeColor : 'black', strokeWidth :0.5}),
			barFill : new JenScript.SymbolBarFill0({}),
			barEffect  : new JenScript.SymbolBarEffect0({}),
		});
		
		var axisLabel = new JenScript.SymbolAxisLabel({
			part : 'South', 
			text : symbol.name,
			textColor : 'turquoise',
			textAnchor : 'end',
			fontSize : 8,
			paintType : 'None',
			rotateAngle : -45,
			ty : 10
		});
		symbol.setAxisLabel(axisLabel);
		count++;
		
		var  s1 = new JenScript.SymbolStack({
			name : 'stack1',
			opacity : 0.8,
			themeColor : '#3498db',
			stackValue : stackValue()
		});
		var  s2 = new JenScript.SymbolStack({
			name : 'stack2',
			opacity : 0.8,
			themeColor : '#9b59b6',
			stackValue : stackValue()
		});
		var  s3 = new JenScript.SymbolStack({
			name : 'stack3',
			opacity : 0.8,
			themeColor : '#34495e',
			stackValue : stackValue()
		});
		
		symbol.addStack(s1);
		symbol.addStack(s2);
		symbol.addStack(s3);
		
		return symbol;
	}
	
	var barLayer = new JenScript.SymbolBarLayer();
	symbolPlugin.addLayer(barLayer);
	
	barLayer.addSymbol(JenScript.SymbolFiller.createGlue(),false);
	
	for (var i = 1; i <= 10; i++) {
		var bar = createBar(barValue());
		barLayer.addSymbol(bar,false);
		
		if(i < 10)
		barLayer.addSymbol(JenScript.SymbolFiller.createStrut(8),false); 
	}
	barLayer.addSymbol(JenScript.SymbolFiller.createStrut(50),false);
	
	symbolPlugin.repaintPlugin();
	
	var t1 = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'Label 1',
		fontSize : 14,
		textColor : 'rgb(91, 151, 168)',
		xAlign : 'right',
		yAlign : 'top',
	});
	projBar.registerPlugin(t1);
	
	var t2 = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'Label 2',
		fontSize : 14,
		textColor : 'rgb(128, 182, 191)',
		xAlign : 'right',
		yAlign : 'top',
		yMargin : 20
	});
	projBar.registerPlugin(t2);
	
	var t3 = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'Label 3',
		fontSize : 14,
		textColor : 'rgb(22, 125, 218)',
		xAlign : 'right',
		yAlign : 'top',
		yMargin : 36
	});
	projBar.registerPlugin(t3);
	
	var tx1 = new JenScript.TranslatePlugin({
		mode : 'ty',
		slaves :[{plugin : symbolPlugin, direction: 'y'},
		         {plugin : gridPlugin, direction: 'y'},
		         {plugin : metrics, direction: 'y'}]
	});
	projBar.registerPlugin(tx1);
	tx1.registerWidget(new JenScript.TranslateCompassWidget({
		ringFillColor : 'pink'
	}));
	tx1.select();
	
	var zoomwheel = new JenScript.ZoomWheelPlugin({
		mode : 'wheelY'
	});
	projBar.registerPlugin(zoomwheel);
	 
}