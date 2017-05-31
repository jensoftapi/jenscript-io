	
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
		minY : 0,
		maxY : 420
	});
	view.registerProjection(proj);
	
	
	
	var title = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'Ray Chart',
		fontSize : 14,
		textColor : '#9b59b6',
		xAlign : 'right',
		yAlign : 'top',
	});
	proj.registerPlugin(title);

	var minor = {
		tickMarkerSize : 1,
		tickMarkerColor : '#2980b9',
		tickMarkerStroke : 1
	};
	var median = {
		tickMarkerSize : 1,
		tickMarkerColor : '#e67e22',
		tickMarkerStroke : 0.6,
		tickTextColor : '#e67e22',
		tickTextFontSize : 8
	};
	var major = {
		tickMarkerSize : 4,
		tickMarkerColor : '#27ae60',
		tickMarkerStroke : 1.2,
		tickTextColor : '#27ae60',
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
	
	stackValue = function (){
		return random(10,30);
	}
	
	 for (var i = -350; i <= 350; i = i + 4) {

	 
		var sray = new JenScript.StackedRay({});
		sray.setName("stacked ray 1");
		sray.setThicknessType('User');
		sray.setThickness(3);
		sray.setRayNature('XRay');
		sray.setRayBase(0);
		sray.setAscentValue(rayValue());
		sray.setRay(i);
		sray.setThemeColor('white');
		//stack value is defined as percent of the whole
		var rs11 = new JenScript.RayStack({name : "ray "+i+" stack 1", themeColor: '#e67e22',stackValue: 20});
		var rs12 = new JenScript.RayStack({name : "ray "+i+" stack 2", themeColor:'#27ae60',stackValue: 30}); 
		var rs13 = new JenScript.RayStack({name: "ray "+i+" stack 3",themeColor: '#2980b9',stackValue:50});

		sray.addStack(rs11);
		sray.addStack(rs12);
		sray.addStack(rs13);

		rayPlugin.addRay(sray);
	}
	
	rayPlugin.repaintPlugin();
	
	//device outline
	var outline = new JenScript.DeviceOutlinePlugin({color:'#1abc9c'});
	proj.registerPlugin(outline);
	
	var translate = new JenScript.TranslatePlugin({
		mode : 'txy',
		slaves : [
		          {plugin : rayPlugin , direction : 'xy'},
		          {plugin : southMetrics , direction : 'x'},
		          {plugin : westMetrics , direction : 'y'},
		          
		          ]
	
	});
	proj.registerPlugin(translate);
	
	translate.select();
	
}

