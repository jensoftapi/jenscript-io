

var minor = {
		tickMarkerSize : 2,
		tickMarkerColor : 'yellow',
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
		holders : 40,
		south : 90
	});


	var bg1 = new JenScript.GradientViewBackground();
	view.addViewBackground(bg1);
	
	var textureBackground = new JenScript.TexturedViewBackground({
		opacity : 0.3,
		texture : JenScript.Texture.getTriangleCarbonFiber(),
		strokeColor : 'cyan',
		strokeWidth : 2,
		cornerRadius : 0
	});
	view.addViewBackground(textureBackground);

	var gloss = new JenScript.GlossViewForeground();
	view.addViewForeground(gloss);


	var proj = new JenScript.LinearProjection({name : "proj1",minX: -1000,maxX: 1000,minY: -1000,maxY: 1000});
	view.registerProjection(proj);
	
	var outline =new JenScript.DeviceOutlinePlugin({color : 'darkslategrey'});
	proj.registerPlugin(outline);
	
	
	var gridPlugin = new JenScript.GridModeledPlugin({gridOrientation : 'Vertical',gridColor : 'green'});
	proj.registerPlugin(gridPlugin);
	
	var zoomwheel = new JenScript.ZoomWheelPlugin();
	proj.registerPlugin(zoomwheel);
	
	
	var southMetrics1 = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisSouth,
		minor:minor,
		median:median,
		major:major
	});
	proj.registerPlugin(southMetrics1);
		
		
	
	
}



