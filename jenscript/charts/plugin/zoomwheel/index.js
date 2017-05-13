
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
	tickMarkerColor : JenScript.RosePalette.PALMLEAF,
	tickMarkerStroke : 1
};
var median = {
	tickMarkerSize : 4,
	tickMarkerColor : JenScript.RosePalette.TURQUOISE,
	tickMarkerStroke : 1.2,
	tickTextColor : JenScript.RosePalette.TURQUOISE,
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
		tickMarkerColor : JenScript.RosePalette.MANDARIN,
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
		minY : 13,
		maxY : 16,
		paintMode : 'ALWAYS'
	});
	view1.registerProjection(proj1);
	
	//OUTLINE PLUGIN
	var outline = new JenScript.DeviceOutlinePlugin({color : JenScript.RosePalette.MELON, strokeOpacity : 0.8, strokeWidth : 1});
	proj1.registerPlugin(outline);
	
	
	//METRICS PLUGIN
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
		textColor : JenScript.RosePalette.DEEPHARBOR,
		xAlign : 'left',
		yAlign : 'bottom',
	});
	proj1.registerPlugin(mme12Legend);
	var mme26Legend = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'MME 26',
		fontSize : 14,
		textColor : JenScript.RosePalette.LEMONPEEL,
		xAlign : 'left',
		yAlign : 'bottom',
		yMargin: 26
	});
	proj1.registerPlugin(mme26Legend);
	
	
	//STOCK PLUGIN
	stockPluginView1Proj1 = new JenScript.StockPlugin({
		bearishColor : JenScript.Color.brighten(JenScript.RosePalette.CALYPSOBLUE,30),
		bullishColor : JenScript.RosePalette.TURQUOISE,
	});
	proj1.registerPlugin(stockPluginView1Proj1);
	
	stockPluginView1Proj1.addLayer(new JenScript.CandleStickLayer({
		lowHighColor : JenScript.RosePalette.SAFFRON
	}));
	
	stockPluginView1Proj1.addLayer(new JenScript.StockExponentialMovingAverageLayer({moveCount:12,curveColor:JenScript.RosePalette.DEEPHARBOR}));
	stockPluginView1Proj1.addLayer(new JenScript.StockExponentialMovingAverageLayer({moveCount:26,curveColor:JenScript.RosePalette.LEMONPEEL}));
	
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
	var outline2 = new JenScript.DeviceOutlinePlugin({color : JenScript.Color.brighten(JenScript.RosePalette.TURQUOISE,40), strokeOpacity : 0.8, strokeWidth : 1});
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
		lineColor:JenScript.RosePalette.MANDARIN,
		lineOpacity:1,
		lineWidth:1,
		
		macdColor:JenScript.RosePalette.CORALRED,
		signalColor:JenScript.RosePalette.CALYPSOBLUE,
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
		textColor : JenScript.RosePalette.CALYPSOBLUE,
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
		textColor : JenScript.RosePalette.CORALRED,
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


	var translateView1Proj1 = new JenScript.TranslatePlugin({name : 'mainTranslate'});
	proj1.registerPlugin(translateView1Proj1);
	
	var translateView1Proj2 = new JenScript.TranslatePlugin({name : 'secondaryTranslate'});
	proj12.registerPlugin(translateView1Proj2);
	
	translateView1Proj1.registerWidget(new JenScript.TranslateCompassWidget({
		ringFillColor : 'orange',
		ringFillOpacity : 0.7,
	}));
	
	var choco = JenScript.RosePalette.CHOCOLATE;
	var percents = ['0%','50%','100%'];
	var colors = [choco,JenScript.RosePalette.COALBLACK,choco];
	var opacity  = [0.8,0.8,0.8];
	
	var txWidget = new JenScript.TranslateX({
		width : 60,
		height :  16,
		outlineStrokeColor : JenScript.RosePalette.FOXGLOWE,
		outlineStrokeWidth : 2,
		shader : {percents : percents, colors : colors,opacity:opacity},
		buttonFillColor :  JenScript.Color.lighten(JenScript.RosePalette.CHOCOLATE,40),
		buttonStrokeWidth : 1,
		buttonRolloverFillColor : JenScript.Color.lighten(JenScript.RosePalette.CHOCOLATE,70),
		mode : {paint : {proj : 'always', plugin : 'always'},event: {proj : 'always', plugin : 'always'}}
	});
	
	
	var tyWidget = new JenScript.TranslateY({
		width : 16,
		height :  60,
		outlineStrokeColor : JenScript.RosePalette.FOXGLOWE,
		outlineStrokeWidth : 2,
		shader : {percents : percents, colors : colors,opacity:opacity},
		buttonFillColor :  JenScript.Color.lighten(JenScript.RosePalette.CHOCOLATE,40),
		buttonStrokeWidth : 1,
		buttonRolloverFillColor : JenScript.Color.lighten(JenScript.RosePalette.CHOCOLATE,70),
		mode : {paint : {proj : 'always', plugin : 'always'},event: {proj : 'always', plugin : 'always'}}
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
		name : 'tertiaryTranslate'
	});
	tx2.registerWidget(new JenScript.TranslateCompassWidget({
		ringFillColor : JenScript.RosePalette.AEGEANBLUE,
		ringFillOpacity : 0.7,
		xIndex :0,
	}));
	proj2.registerPlugin(tx2);

	
	
	var synchronizer = new JenScript.TranslateSynchronizer({
		translates : [ translateView1Proj1,translateView1Proj2, tx2 ]
	});
	

	
	view1.setActiveProjection(proj1);
	translateView1Proj1.select();
	//lens.select();
	
//	var buttonGroup = new JenScript.ButtonPlugin();
//	proj1.registerPlugin(buttonGroup);
//	var button1 = new JenScript.ButtonWidget({
//		width : 50,
//		height : 30,
//		radius : 0,
//		inset : 8,
//		text : 'Lock',
//		textColor : 'white',
//		buttonDrawColor : 'white',
//		buttonRolloverDrawColor : 'yellow',
//		buttonFillColor : 'black',
//		buttonRolloverFillColor : 'green',
//		buttonFillColorOpacity : 0.5,
//		buttonDrawColorOpacity : 1,
//		xIndex : 6,
//		onPress : function(){
//			if(!lens.isLockSelected()){
//				lens.select();
//				return;
//			}	
//			if(!tx1.isLockSelected()){
//				tx1.select();
//				return;
//			}
//				
//		}
//	});
//	buttonGroup.registerWidget(button1);
	//tx1.select();
}

function createPie(view){
	var proj = new JenScript.LinearProjection({
		name : "proj1",
		minX : -1,
		maxX : 1,
		minY : -3,
		maxY : 3,
		paintMode : 'ACTIVE'
		
	});
	view.registerProjection(proj);


	var piePlugin = new JenScript.PiePlugin();
	proj.registerPlugin(piePlugin);

	var pie = new JenScript.Pie({
		radius : 80, 
		startAngleDegree : 30,
		opacity: 1,
		y : -1 
	});
	piePlugin.addPie(pie);

	pie.paint = false; //paint one time plugin by calling repainPlugin at end of block code section
	
	var fill = new JenScript.PieDefaultFill();
	pie.setFill(fill);

	var fx0 = new JenScript.PieLinearEffect();
	pie.addEffect(fx0);
	//var fxl = new JenScript.PieReflectionEffect();
	//pie.addEffect(fxl);
	
	var s1 = new JenScript.PieSlice({
		name : "s1",
		value : 45,
		themeColor : 'rgba(240, 240, 240, 0.9)',
	});
	var s2 = new JenScript.PieSlice({
		name : "s2",
		value : 5,
		themeColor : JenScript.RosePalette.CORALRED,
	});
	var s3 = new JenScript.PieSlice({
		name : "s3",
		value : 30,
		opacity : 1,
		themeColor : 'rgba(78,148,44,1)',
	});
	var s4 = new JenScript.PieSlice({
		name : "s4",
		value : 5,
		themeColor : JenScript.RosePalette.AEGEANBLUE,
		divergence : 20,
		
	});
	var s5 = new JenScript.PieSlice({
		name : "s5",
		value : 5,
		themeColor : JenScript.RosePalette.INDIGO,
	});

	pie.addSlices([s1,s2,s3,s4,s5]);
	

	var s1Label = new JenScript.PieRadialLabel({
		text : "Silver",
		fillColor:'black',
		fontSize : 11,
		outlineColor : s1.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :JenScript.Color.lighten(s1.getThemeColor(),20),
	});
	s1.setSliceLabel(s1Label);

	var s2Label = new JenScript.PieRadialLabel({
		text : "Platinium",
		fillColor:'black',
		fontSize : 11,
		outlineColor : JenScript.Color.lighten(s2.getThemeColor(),20),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :JenScript.Color.lighten(s2.getThemeColor(),40),
	});
	s2.setSliceLabel(s2Label);

	var s3Label = new JenScript.PieRadialLabel({
		text : "Rhodium",
		fillColor:'black',
		fontSize : 11,
		outlineColor : s3.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :JenScript.Color.lighten(s3.getThemeColor(),30),
		
	});
	s3.setSliceLabel(s3Label);

	var s4Label = new JenScript.PieRadialLabel({
		text : "Chrome",
		fillColor:'black',
		fontSize : 11,
		outlineColor : s4.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :JenScript.Color.lighten(s4.getThemeColor(),30),
	});
	s4.setSliceLabel(s4Label);

	var s5Label = new JenScript.PieRadialLabel({
		text : "Uranium",
		fillColor:'black',
		outlineColor : JenScript.Color.lighten(s5.getThemeColor(),30),
		cornerRadius : 8,
		outlineWidth : 2,
		fontSize : 11,
		textColor :JenScript.Color.lighten(s5.getThemeColor(),50)
	});
	s5.setSliceLabel(s5Label);

	piePlugin.repaintPlugin();
}
