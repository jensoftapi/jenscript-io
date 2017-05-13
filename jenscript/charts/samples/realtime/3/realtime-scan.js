
/**
 * Create Scan View
 * 
 * @param container
 * @param width
 * @param height
 * 
 * @author JenSoft API
 */
function createView(container, width, height) {

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
		minX : 0,
		maxX : 150,
		minY : 0,
		maxY : 103
	});
	view.registerProjection(proj);
	
	var outline = new JenScript.DeviceOutlinePlugin({color : 'pink'});
	proj.registerPlugin(outline);
	minor = {
		tickMarkerSize : 2,
		tickMarkerColor : JenScript.RosePalette.TURQUOISE,
		tickMarkerStroke : 1
	};
	median = {
		tickMarkerSize : 4,
		tickMarkerColor : JenScript.RosePalette.EMERALD,
		tickMarkerStroke : 1.2,
		tickTextColor : JenScript.RosePalette.EMERALD,
		tickTextFontSize : 10
	};
	major = {
		tickMarkerSize : 8,
		tickMarkerColor : JenScript.RosePalette.TURQUOISE,
		tickMarkerStroke : 3,
		tickTextColor : JenScript.RosePalette.TURQUOISE,
		tickTextFontSize : 12
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

	var tx1 = new JenScript.TranslatePlugin({mode:'tx'});
	proj.registerPlugin(tx1);
	tx1.select();
	
	
	var legend1 = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'Scan',
		fontSize : 12,
		textColor : JenScript.RosePalette.TURQUOISE,
		xAlign : 'right',
		yAlign : 'top',
		yMargin: 5
	});
	proj.registerPlugin(legend1);
	
	
	
	var progress = new ProgressDevicePlugin({});
	proj.registerPlugin(progress);
	
	var scanInfo = new ScanInfo({});
	proj.registerPlugin(scanInfo);
	
	var rayPlugin = new JenScript.RayPlugin({});
	proj.registerPlugin(rayPlugin);
	
	// arbitrary values between min max values
	var random = function getRandomArbitrary(min, max) {
	  return Math.random() * (max - min) + min;
	}
	
	rayValue = function (){
		return random(10,80);
	}
	
	makeChannel = function(i) {

		var ray = new JenScript.Ray();
		ray.setRayNature('XRay');
		ray.setRay(i);
		ray.setRayBase(0);
		ray.setThickness(6);
		ray.setThicknessType('Device');
		ray.setThemeColor(JenScript.RosePalette.EMERALD);
		ray.setName('Mpx '+i+' MHz');
		ray.setAscentValue(rayValue());
		rayPlugin.addRay(ray);
		rayPlugin.repaintPlugin();

		//ray.inflate(rand.nextInt(76), 0, 200, 20);
		
		scanInfo.addChannel(ray);
	}
	
	
	progress.start();
	scanInfo.start();
	
	var makeProgress = function(i,millis){
		setTimeout(function(){
				makeChannel(i);
				progress.setCurrentProgress(i);
				if(i == 150){
					progress.stop();
					scanInfo.stop();
				}
					
		},millis);
	}
	
	for (var i = 0; i <= 150; i++) {
		makeProgress(i,i*40);
	}
}