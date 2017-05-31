
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
		minY : -0,
		maxY : 250
	});
	view.registerProjection(proj);
	
	
	
	var title = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'Ray Chart Listener',
		fontSize : 14,
		textColor : 'black',
		xAlign : 'right',
		yAlign : 'top',
	});
	proj.registerPlugin(title);


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
		ray.setThemeColor('#1abc9c');
		ray.setRay(i);
		rayPlugin.addRay(ray);
	}

	
	
	rayPlugin.repaintPlugin();
	
	var labelPlugin = new JenScript.TextLabelPlugin();
	proj.registerPlugin(labelPlugin);
	
	var label = new JenScript.TextLabel({
		fillColor : 'black',
		outlineColor : 'rgb(244, 145, 26)',
		cornerRadius : 10,
		outlineWidth : 2,
		textColor : 'rgb(244, 145, 26)',
		fontSize : 16
	});
	labelPlugin.addLabel(label);

	var updateText = function(action, point) {
		label.setText(action);
		label.setX(point.device.x);
		label.setY(point.device.y);
		labelPlugin.repaintPlugin();
	};
	
	var lock = false;
	rayPlugin.addRayListener('enter',function(event){
		updateText('enter',event);
		lock = true;
		setTimeout(function(){lock=false;},200);
	},'this demo');
	
	rayPlugin.addRayListener('exit',function(event){
		updateText('exit',event);
		setTimeout(function(){updateText(undefined,event);},200);
	},'this demo');
	
	rayPlugin.addRayListener('move',function(event){
		if(!lock)
		updateText('move',event);
	},'this demo');
	
	rayPlugin.addRayListener('press',function(event){
		updateText('press',event);
	},'this demo');
	
	rayPlugin.addRayListener('release',function(event){
		updateText('release',event);
	},'this demo');
	
	var outline = new JenScript.DeviceOutlinePlugin({color:'#2ecc71'});
	proj.registerPlugin(outline);
	
	var zoomwheel = new JenScript.ZoomWheelPlugin({mode:'wx'});
	proj.registerPlugin(zoomwheel);
	
	var translate = new JenScript.TranslatePlugin({mode : 'tx'});
	proj.registerPlugin(translate);
	translate.select();
	
}

function createView2(container, width, height) {
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
		minY : -80,
		maxY : 420
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
	
	 var BUTTER3 = 'rgb(199, 174, 47)';
	 var CHAMELEON3 = 'rgb(121, 163, 39)';
	 var ORANGE3 = 'rgb(191, 118, 41)';

	 for (var i = -250; i <= 250; i = i + 4) {

	 
		var sray = new JenScript.StackedRay({});
		sray.setName("stacked ray "+i);
		sray.setThicknessType('User');
		sray.setThickness(3);
		sray.setRayNature('XRay');
		sray.setRayBase(0);
		sray.setAscentValue(rayValue());
		sray.setRay(i);
		sray.setThemeColor('white');
		//stack value is defined as percent of the whole
		var rs11 = new JenScript.RayStack({name : "ray "+i+" stack 1", themeColor: BUTTER3,stackValue: 20});
		var rs12 = new JenScript.RayStack({name : "ray "+i+" stack 2", themeColor:CHAMELEON3,stackValue: 30});
		var rs13 = new JenScript.RayStack({name: "ray "+i+" stack 3",themeColor: ORANGE3,stackValue:50});

		sray.addStack(rs11);
		sray.addStack(rs12);
		sray.addStack(rs13);

		rayPlugin.addRay(sray);
	}
	
	rayPlugin.repaintPlugin();
	
	//label for listener
	var labelPlugin = new JenScript.TextLabelPlugin();
	proj.registerPlugin(labelPlugin);
	
	var label = new JenScript.TextLabel({
		fillColor : 'black',
		outlineColor : 'rgb(244, 145, 26)',
		cornerRadius : 10,
		outlineWidth : 2,
		textColor : 'rgb(244, 145, 26)',
		fontSize : 16
	});
	labelPlugin.addLabel(label);

	var updateText = function(action, event) {
		if(action)
			label.setText(action+' name : '+event.ray.name);
		else
			label.setText(undefined);
		label.setX(event.device.x);
		label.setY(event.device.y);
		labelPlugin.repaintPlugin();
	};
	
	
	var lock = false;
	//listener
	//event is something like, refer to source
	//event : {ray : ray, x:x,y:y, device :{x:x,y:y}}
	
	rayPlugin.addRayListener('enter',function(event){
		updateText('enter',event);
		lock = true;
		setTimeout(function(){lock=false;},200);
	},'this demo');
	
	rayPlugin.addRayListener('exit',function(event){
		updateText('exit',event);
		setTimeout(function(){updateText(undefined,event);},200);
	},'this demo');
	
	rayPlugin.addRayListener('move',function(event){
		if(!lock)
		updateText('move',event);
	},'this demo');
	
	rayPlugin.addRayListener('press',function(event){
		updateText('press',event);
	},'this demo');
	
	rayPlugin.addRayListener('release',function(event){
		updateText('release',event);
	},'this demo');
	
	//device outline
	var outline = new JenScript.DeviceOutlinePlugin({color:'#e74c3c'});
	proj.registerPlugin(outline);
	
}

