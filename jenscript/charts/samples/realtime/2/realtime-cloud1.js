
/**
 * Create real time cloud points view
 * 
 * @param container
 * @param width
 * @param height
 *  * @author JenSoft API
 */
function createViewRealTimeCloud1(container, width, height) {

	// view
	var view = new JenScript.View({
		name : container,
		width : width,
		height : height,
		holders : 20,
		west : 80,
		south : 80,
	});

	var proj = new JenScript.LinearProjection({
		name : "proj1",
		minX : -2500,
		maxX : 2500,
		minY : -2500,
		maxY : 2500
	});
	view.registerProjection(proj);
	
	var outline = new JenScript.DeviceOutlinePlugin({color : 'pink'});
	proj.registerPlugin(outline);
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
	var southMetrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisSouth,
		minor : minor,
		median : median,
		major : major,
	});
	proj.registerPlugin(southMetrics);
	var westMetrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisWest,
		minor : minor,
		median : median,
		major : major,
	});
	proj.registerPlugin(westMetrics);

	var tx1 = new JenScript.TranslatePlugin();
	proj.registerPlugin(tx1);
	tx1.select();
	
	var zoomwheel = new JenScript.ZoomWheelPlugin();
	proj.registerPlugin(zoomwheel);
	
	var legend1 = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'Real Time Cloud',
		fontSize : 12,
		textColor : '#d35400',
		xAlign : 'right',
		yAlign : 'top',
		yMargin: 5
	});
	proj.registerPlugin(legend1);

	var DemoPlugin = {};

	DemoPlugin.LineData = function(config) {
		this._init(config);
		this.dataPath;
		this.counter = 0;
	};
	JenScript.Model.inheritPrototype(DemoPlugin.LineData, JenScript.Plugin);
	JenScript.Model.addMethods(DemoPlugin.LineData,
					{
						_init : function(config) {
							JenScript.Plugin.call(this, config);
						},

						setCloud : function(dataPoints) {
							this.dataPoints = dataPoints;
							this.repaintPlugin();
						},

						paintPlugin : function(g2d, part) {
							if (part !== JenScript.ViewPart.Device)
								return;

							if (this.dataPoints === undefined){
								console.log("undefined datapoints");
								return;
							}
								

							for (var i = 1; i < this.dataPoints.record.length; i++) {
								var pt = this.dataPoints.record[i];
								var p = this.getProjection().userToPixel(pt);
								var svgRect = new JenScript.SVGRect().origin(p.x-0.5,p.y-0.5).size(1,1).fill('#d35400');
								g2d.insertSVG(svgRect.toSVG());
							}
						}
	});

	var myDemoPlugin = new DemoPlugin.LineData({});
	proj.registerPlugin(myDemoPlugin);
	

	
	function RealTimeSimulator(data) {
		var highestTimeoutId = setTimeout(";");
		for (var i = 0 ; i < highestTimeoutId ; i++) {
		    clearTimeout(i); 
		}
		
		var run = function(i, dp, onFinish) {
			setTimeout(function() {
				myDemoPlugin.setCloud(dp);
				onFinish(i);
			}, i * 150);
		};
	
		for (var i = 0; i < data.length; i++) {
			var dp = data[i];
			run(i, dp, function onFinish(rank) {
				if (rank === (data.length - 1)) {
					simulator = new RealTimeSimulator(data);
				}
			});
		}
	}
	
	var simulator = undefined;
	
	var loader = new DataLoader(proj,'data-cloud1',function(data){
		simulator = new RealTimeSimulator(data);
	});

}