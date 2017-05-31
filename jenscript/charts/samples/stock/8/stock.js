
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
	
	
function createViewStockTimePicker(container, width, height) {

	var rootContainer = document.getElementById(container);
	while (rootContainer.firstChild) {
		rootContainer.removeChild(rootContainer.firstChild);
	}
	
	var nodeView1 = document.createElement("div");
	nodeView1.setAttribute('id',container+'vview1');
	var nodeView2 = document.createElement("div");
	nodeView2.setAttribute('id',container+'vview2');
	
	rootContainer.appendChild(nodeView1);
	rootContainer.appendChild(nodeView2);

	var view = new JenScript.View({
		name : container + 'vview1',
		width : 900,
		height : 300,
		east : 80,
		west : 80,
		south : 80,
	});
	
	var startDate = new Date(2013, 04, 25);
	var endDate = new Date(2013, 08, 05);
	

	var proj1 = new JenScript.TimeXProjection({
		name : "proj1",
		minXDate : startDate,
		maxXDate : endDate,
		minY : 17,
		maxY : 25
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

	var tx1 = new JenScript.TranslatePlugin({});
	proj1.registerPlugin(tx1);
	tx1.registerWidget(new JenScript.TranslateCompassWidget({
		ringFillColor : 'pink'
	}));
	var tpad = new JenScript.TranslatePad();
	tx1.registerWidget(tpad);
	
	tx1.select();

	

	var stockPlugin = new JenScript.StockPlugin({
		bearishColor : '#c0392b',
		bullishColor : '#16a085',
	});
	proj1.registerPlugin(stockPlugin);

	stockPlugin.addLayer(new JenScript.CandleStickLayer({
		lowHighColor : 'black'
	}));
	
	stockPlugin.addLayer(new JenScript.StockExponentialMovingAverageLayer({moveCount:12,curveColor:'purple'}));
	stockPlugin.addLayer(new JenScript.StockExponentialMovingAverageLayer({moveCount:26,curveColor:'green'}));
	
	
	var mme12Legend = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'MME 12',
		fontSize : 14,
		textColor : 'purple',
		xAlign : 'right',
		yAlign : 'top',
	});
	proj1.registerPlugin(mme12Legend);
	
	
	var mme26Legend = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'MME 26',
		fontSize : 14,
		textColor : 'green',
		xAlign : 'right',
		yAlign : 'top',
		yMargin: 26
	});
	proj1.registerPlugin(mme26Legend);
	
	var loader = new StockLoader(proj1,[2013],function(year,stocks){
		stockPlugin.setStocks(stocks);
		stockPlugin2.setStocks(stocks);
	});

	var view2 = new JenScript.View({
		name : container + 'vview2',
		width : 900,
		height : 150,
		east : 80,
		west : 80,
		south : 40,
		north : 10,
	});
	
	var dateMin = new Date(2007, 01, 01);
	var dateMax = new Date(2015, 06, 01);
	
	var proj2 = new JenScript.TimeXProjection({
		cornerRadius : 6,
		name : "proj2",
		minXDate : dateMin,
		maxXDate : dateMax,
		minY : 8,
		maxY : 50
	});
	view2.registerProjection(proj2);
	
	var outline2 = new JenScript.DeviceOutlinePlugin({color : 'darkslategrey'});
	proj2.registerPlugin(outline2);
	
	var tpLegend = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'Select stock frame',
		fontSize : 8,
		textColor : 'black',
		xAlign : 'right',
		yAlign : 'top',
		yMargin: 5
	});
	proj2.registerPlugin(tpLegend);
	

	var southMetrics2 = new JenScript.AxisMetricsTiming({
		axis : JenScript.Axis.AxisSouth,
		models : [new JenScript.HourModel({}),new JenScript.DayModel({}),new JenScript.MonthModel({}),new JenScript.YearModel({})],
		minor : minor,
		median:median,
		major:major
	});
	proj2.registerPlugin(southMetrics2);
	
	
	var stockPlugin2 = new JenScript.StockPlugin({
		bearishColor : '#c0392b',
		bullishColor : '#16a085',
	});
	proj2.registerPlugin(stockPlugin2);

	stockPlugin2.addLayer(new JenScript.StockFixingLayer({
		curveColor :'black',
		curveWidth : 0.4
	}));
	
	JenScript.StockTimePickerPlugin = function(config) {
		this._init(config);
	};
	JenScript.Model.inheritPrototype(JenScript.StockTimePickerPlugin, JenScript.Plugin);
	JenScript.Model.addMethods(JenScript.StockTimePickerPlugin,{
		
		_init : function(config){
			config=config||{};
			config.name = 'StockTimePickerPlugin';
			JenScript.Plugin.call(this, config);
			this.bound;
			
			this.lock = false;
			this.initialTime;
			this.currentTime;
			this.leftMillis;
			this.rightMillis;
		},
		
		onPress : function(evt,part,x, y){
			if(this.bound !== undefined && this.bound.contains(x,y)){
				this.lock = true;
				this.initialTime = this.getProjection().pixelToTime(x);
				var p0 = this.initialTime.getTime();
				var p1 = proj1.getMinDate().getTime();
				var p2 = proj1.getMaxDate().getTime();
				
				this.leftMillis = p0-p1;
				this.rightMillis = p2-p0;
				
			}
		},
		
		onMove : function(evt,part,x, y){
			if(this.lock){
				this.currentTime = this.getProjection().pixelToTime(x);
				var p0 = this.currentTime.getTime();
				var p1 = p0-this.leftMillis;
				var p2 = p0+this.rightMillis;
				
				var min =  this.getProjection().getMinDate().getTime();
				var max =  this.getProjection().getMaxDate().getTime();
				
				if(p1 > min && p2<max){
					this.repaintPlugin();
					setTimeout(function(){
						proj1.bound(p1,p2,proj1.minY,proj1.maxY);
					},20);
				}
			}
		},
		
		onExit : function(evt,part,x, y){
			if(this.lock){
				this.lock = false;
			}
		},
		
		onRelease : function(evt,part,x, y){
			if(this.lock){

				this.lock = false;
			}
		},

		
		paintPlugin : function(g2d, part) {
			if (part === JenScript.ViewPart.Device) {
				var proj1MinDate = proj1.getMinDate();
				var proj1MaxDate = proj1.getMaxDate();
				
				var minPixel = this.getProjection().timeToPixel(proj1MinDate);
				var maxPixel = this.getProjection().timeToPixel(proj1MaxDate);
				
				var dh = this.getProjection().getView().getDevice().getHeight();
				var dw = this.getProjection().getView().getDevice().getWidth();
				
				if(minPixel>0){
					var svgRectLeft = new JenScript.SVGRect().origin(0,0).size(minPixel,dh).Id('rectLeft');
					g2d.deleteGraphicsElement('rectLeft');
					g2d.insertSVG(svgRectLeft.fill('#16a085').fillOpacity(0.5).toSVG());
				}
				
				if(maxPixel-minPixel>0){
					var svgRectView = new JenScript.SVGRect().origin(minPixel,0).size(maxPixel-minPixel,dh).Id('rectView');
					this.bound = new JenScript.Bound2D(minPixel,0,maxPixel-minPixel,dh);
					g2d.deleteGraphicsElement('rectView');
					g2d.insertSVG(svgRectView.fill('#d35400').fillOpacity(0.4).toSVG());
				}
				
				if(dw-maxPixel>0){
					var svgRectRight = new JenScript.SVGRect().origin(maxPixel,0).size(dw-maxPixel,dh).Id('rectRight');
					g2d.deleteGraphicsElement('rectRight');
					g2d.insertSVG(svgRectRight.fill('#16a085').fillOpacity(0.5).toSVG());
				}
				
			}
		}
		
	});
	
	proj1.addProjectionListener('boundChanged',function(){
		timePicker.repaintPlugin();
		
	},'Stock projection listener');
	
	
	var timePicker = new JenScript.StockTimePickerPlugin({});
	proj2.registerPlugin(timePicker);
	
}
