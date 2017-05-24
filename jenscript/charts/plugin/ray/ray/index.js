	
function createView(container, width, height) {
	var view = new JenScript.View({
		name : container,
		width : width,
		height : height,
		south: 40,
		west : 40,
		
	});
	
	var proj = new JenScript.LinearProjection({
		name : "proj1",
		minX : -250,
		maxX : 250,
		minY : -250,
		maxY : 250
	});
	view.registerProjection(proj);
	
	var title = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'Ray Chart',
		fontSize : 14,
		textColor : JenScript.RosePalette.CHOCOLATE,
		xAlign : 'right',
		yAlign : 'top',
	});
	proj.registerPlugin(title);

	var minor = {
		tickMarkerSize : 1,
		tickMarkerColor : JenScript.RosePalette.PINGPIZZAZZ,
		tickMarkerStroke : 1
	};
	var median = {
		tickMarkerSize : 1,
		tickMarkerColor : JenScript.RosePalette.EMERALD,
		tickMarkerStroke : 0.6,
		tickTextColor : JenScript.RosePalette.EMERALD,
		tickTextFontSize : 8
	};
	var major = {
		tickMarkerSize : 4,
		tickMarkerColor : JenScript.RosePalette.CALYPSOBLUE,
		tickMarkerStroke : 1.2,
		tickTextColor : JenScript.RosePalette.CALYPSOBLUE,
		tickTextFontSize : 10
	};
	var southMetrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisSouth,
		minor : minor,
		median : median,
		major :major
	});
	proj.registerPlugin(southMetrics);
	
	var westMetrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisWest, gravity :'natural', //gravity :'rotate'
		minor : minor,
		median : median,
		major :major
	});
	
	proj.registerPlugin(westMetrics);
	
	
	
	var rayPlugin = new JenScript.RayPlugin({});
	proj.registerPlugin(rayPlugin);
	
	
	// arbitrary values between min max values
	var random = function getRandomArbitrary(min, max) {
	  return Math.random() * (max - min) + min;
	}
	
	rayValue = function (){
		return random(80,200);
	}
	
	for (var i = -250; i <= 250; i = i + 10) {
		var ray = new JenScript.Ray();
		ray.setName("ray" + i);
		ray.setThicknessType('Device');//means in pixel
		ray.setThickness(6);
		ray.setRayNature('XRay');
		ray.setRayBase(0);
		ray.setAscentValue(rayValue());
		ray.setThemeColor('purple');
		ray.setRay(i);
		rayPlugin.addRay(ray);
	}

	for (var i = -250; i <= 250; i = i + 10) {
		var ray = new JenScript.Ray();
		ray.setName("ray" + i);
		ray.setThicknessType('Device');
		ray.setThickness(6);
		ray.setRayNature('XRay');
		ray.setRayBase(0);
		ray.setDescentValue(rayValue());
		ray.setThemeColor('orange');
		ray.setRay(i);
		rayPlugin.addRay(ray);
	}
	
	rayPlugin.repaintPlugin();
	
	//device outline
	var outline = new JenScript.DeviceOutlinePlugin({color:JenScript.RosePalette.EMERALD});
	proj.registerPlugin(outline);
	
	var zoomwheel = new JenScript.ZoomWheelPlugin({mode:'wx'});
	proj.registerPlugin(zoomwheel);
	
	var translate = new JenScript.TranslatePlugin({mode : 'tx'});
	proj.registerPlugin(translate);
	translate.select();	
}