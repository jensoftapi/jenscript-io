



var indigo = JenScript.RosePalette.INDIGO;
var choco = JenScript.RosePalette.CHOCOLATE;
var emerald = JenScript.RosePalette.EMERALD;
var aegean = JenScript.RosePalette.AEGEANBLUE;


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
	tickMarkerColor : JenScript.Color.lighten(choco,20),
	tickMarkerStroke : 3,
	tickTextColor : JenScript.Color.lighten(choco,20),
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
	
	//stock plugin
	var stockPlugin1 = new JenScript.StockPlugin({
		bearishColor : JenScript.RosePalette.AMETHYST,
		bullishColor : JenScript.RosePalette.LIME,
	});
	projPrice.registerPlugin(stockPlugin1);

	stockPlugin1.addLayer(new JenScript.CandleStickLayer({
		lowHighColor : JenScript.RosePalette.COALBLACK
	}));
	stockPlugin1.addLayer(new JenScript.StockBollingerLayer({
		bandColor:JenScript.RosePalette.FLANNELGRAY,
		bandOpacity: 0.1,
		lineColor:JenScript.Color.lighten(aegean,25),
		lineOpacity:0.6,
		lineWidth : 0.5
	}));

	//device outline
	var outline = new JenScript.DeviceOutlinePlugin({color:JenScript.Color.lighten(indigo,40)});
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

	//translate
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
			buttonRolloverStrokeColor:JenScript.Color.lighten(emerald,40)}
	);
	translate1.registerWidget(txw);
	translate1.select();



	var title = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'Bollinger',
		fontSize : 14,
		textColor : JenScript.RosePalette.CHOCOLATE,
		xAlign : 'right',
		yAlign : 'top',
	});
	projPrice.registerPlugin(title);
	
	
	var __loader = new StockLoader(projPrice,[2013,2014,2015],function(year,stocks){
		stockPlugin1.setStocks(stocks);
	});
	
	
}
