	
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
		minX : -300,
		maxX : 300,
		minY : -250,
		maxY : 250
	});
	view.registerProjection(proj);
	
	var title = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'Ray Chart',
		fontSize : 14,
		textColor : 'black',
		xAlign : 'right',
		yAlign : 'top',
	});
	proj.registerPlugin(title);

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
		ray.setThicknessType('User');//means in user coordinate
		ray.setThickness(6);
		ray.setRayNature('XRay');
		ray.setRayBase(0);
		ray.setAscentValue(rayValue());
		ray.setThemeColor('#2980b9');
		ray.setRay(i);
		rayPlugin.addRay(ray);
	}

	for (var i = -250; i <= 250; i = i + 10) {
		var ray = new JenScript.Ray();
		ray.setName("ray" + i);
		ray.setThicknessType('Users');
		ray.setThickness(6);
		ray.setRayNature('XRay');
		ray.setRayBase(0);
		ray.setDescentValue(rayValue());
		ray.setThemeColor('#d35400');
		ray.setRay(i);
		rayPlugin.addRay(ray);
	}
	
	rayPlugin.repaintPlugin();
	
	//device outline
	var outline = new JenScript.DeviceOutlinePlugin({color:'#9b59b6'});
	proj.registerPlugin(outline);
	
	var zoomwheel = new JenScript.ZoomWheelPlugin({mode:'wx'});
	proj.registerPlugin(zoomwheel);
	
	var translate = new JenScript.TranslatePlugin({mode : 'tx'});
	proj.registerPlugin(translate);
	translate.select();
	
}

