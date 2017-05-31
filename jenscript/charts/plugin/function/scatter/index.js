
var minor = {
		tickMarkerSize : 2,
		tickMarkerColor : 'cyan',
		tickMarkerStroke : 1
	};
var median = {
	tickMarkerSize : 4,
	tickMarkerColor : 'cyan',
	tickMarkerStroke : 1.2,
	tickTextColor : 'cyan',
	tickTextFontSize : 10,
	tickTextOffset : 8
};


var major = {
	tickMarkerSize : 8,
	tickMarkerColor : 'yellow',
	tickMarkerStroke : 3,
	tickTextColor : 'yellow',
	tickTextFontSize : 12,
	tickTextOffset : 16
};

function createViewLineScatterXFunction(container, width, height) {
	
	var view = new JenScript.View({
		name : container,
		width : width,
		height : height,
		holders : 40,
		
	});

	

	var proj = new JenScript.LinearProjection({
		name : "proj1",
		minX : -1,
		maxX : 12,
		minY : 0,
		maxY : 20
	});
	view.registerProjection(proj);

	var outline = new JenScript.DeviceOutlinePlugin({
		color : 'pink'
	});
	proj.registerPlugin(outline);

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
	
	
	//CURVE FUNCTION 
	var xValues = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
	var yValues = [ 6, 1.8, 15, 1.9, 3.4, 6.1, 4.2, 8.5, 9.9, 12, 8 ];
	var splineSource = new JenScript.SplineSource({
					nature : 'XFunction',
					xValues : xValues,
					yValues : yValues,
					delta : 0.05
				});
	
	
	var functionPlugin = new JenScript.FunctionPlugin();
	proj.registerPlugin(functionPlugin);
	
	var scatter = new JenScript.Scatter({
			name :'my scatter function',
			themeColor : '#2980b9',
			source : splineSource
			});
	
	
	functionPlugin.addFunction(scatter);
	
	//TOOLS
	var tx = new JenScript.TranslatePlugin({
		name : 'tx',
		slaves : [
		          {plugin : functionPlugin, direction : 'xy'},
		          {plugin : southMetrics, direction :'x'},
		          {plugin : westMetrics, direction :'y'},
		         ]
	});
	proj.registerPlugin(tx);
	tx.select();
	
	var zw = new JenScript.ZoomWheelPlugin();
	proj.registerPlugin(zw);
	


}
