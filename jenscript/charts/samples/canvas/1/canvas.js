	JenScript.BasicCanvasPlugin = function(config) {
		this._init(config);
	};
	JenScript.Model.inheritPrototype(JenScript.BasicCanvasPlugin, JenScript.Plugin);
	JenScript.Model.addMethods(JenScript.BasicCanvasPlugin,{
		
		_init : function(config){
			config=config||{};
			config.name ='BasicCanvasPlugin';
			this.labels = [];
			JenScript.Plugin.call(this, config);
		},
		
		/**
		 * on projection register add 'bound changed' projection listener that invoke repaint plugin
		 * when projection bound changed event occurs.
		 */
		onProjectionRegister : function(){
			var that = this;
			this.getProjection().addProjectionListener('boundChanged', function(){
				that.repaintPlugin();
			},'CanvasPlugin projection bound changed');
		},
		
		
		/**
		 * paint text labels
		 * @param {Object} graphics context 
		 * @param {String} view part name
		 */
		paintPlugin : function(g2d, part) {
			if (part !== JenScript.ViewPart.Device) {
				return;
			}
			
			
			var canvasRoot = new JenScript.SVGGroup().Id(this.Id).toSVG();
			g2d.insertSVG(canvasRoot);
			
			
			var fo = new JenScript.SVGElement()
						.name('foreignObject')
						.attr('width',this.getDevice().getWidth()+'px')
						.attr('height',this.getDevice().getHeight()+'px')
						.attr("x",this.getWest())
						.attr("y",this.getNorth())
						.buildHTML();
			
			canvasRoot.appendChild(fo);
			
			var canvas = document.createElement("canvas");
			canvas.setAttribute("width",this.getDevice().getWidth());
			canvas.setAttribute("height",this.getDevice().getHeight());
			canvas.setAttribute("x",this.getWest());
			canvas.setAttribute("y",this.getNorth());
			canvas.setAttribute("style","pointer-events: none;"); //else event are dropped?
			
			
			fo.appendChild(canvas);
			
			var ctx = canvas.getContext("2d");
			ctx.fillStyle = "#FF0000";
			ctx.fillRect(10,10,150,75);
			
		}
		
});

function create(container, width, height) {

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
	var startDate = new Date(2005, 09, 01);
	var endDate = new Date(2020, 11, 01);

	var proj1 = new JenScript.TimeXProjection({
		cornerRadius : 6,
		name : "proj1",
		minXDate : startDate,
		maxXDate : endDate,
		minY : 8,
		maxY : 60
	});
	view.registerProjection(proj1);
	
	var outline = new JenScript.DeviceOutlinePlugin({color : 'black'});
	proj1.registerPlugin(outline);

	var minor = {
			tickMarkerSize : 2,
			tickMarkerColor : '#9b59b6',
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
	var southMetrics1 = new JenScript.AxisMetricsTiming({
		axis : JenScript.Axis.AxisSouth,
		models : [new JenScript.HourModel({}),new JenScript.DayModel({}),new JenScript.MonthModel({})],
		minor : minor,
		median : median,
		major:major
	});
	proj1.registerPlugin(southMetrics1);
	
	
	var westMetrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisWest,
		minor : minor,
		median : median,
		major:major
	});
	proj1.registerPlugin(westMetrics);

	var stockPlugin = new JenScript.StockPlugin();
	proj1.registerPlugin(stockPlugin);

	stockPlugin.addLayer(new JenScript.CandleStickCanvasLayer({}));
	
	
	var tx1 = new JenScript.TranslatePlugin({
		name : 'canvas translate',
		slaves : [
		          { plugin : stockPlugin , direction : 'xy'},
		          { plugin : southMetrics1 , direction : 'x'},
		          { plugin : westMetrics , direction : 'y'},
		          ]
	});
	proj1.registerPlugin(tx1);
	var tpad = new JenScript.TranslatePad();
	tx1.registerWidget(tpad);
	tx1.registerWidget(new JenScript.TranslateCompassWidget({
		ringFillColor : 'pink'
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

	
	var loader = new StockLoader(proj1,[2007,2008,2009,2010,2011,2012,2013,2014,2015,2016],function(year,stocks){
		stockPlugin.setStocks(stocks);
	});
	
	//var canvas = new JenScript.BasicCanvasPlugin();
	//proj1.registerPlugin(canvas);
	
//	var loader = new StockLoader(projCandle,[2014,2015,2016],function(year,stocks){
//		//console.log("add year : "+year+" for total stocks "+stocks.length);
//		stockPluginView1Proj1.setStocks(stocks);
//	},{foregroundColor : 'rgba(153, 255, 51,0.5)', outlineColor : 'rgb(255, 255, 0)'});

	
}

