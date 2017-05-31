
/**
 * Create view with metrics
 * 
 * @param container
 * @param width
 * @param height
 */
function createViewSplineCurveXFunction(container, width, height) {
	
	var view = new JenScript.View({
		name : container,
		width : width,
		height : height,
		holders : 40,
		west : 70,
		south: 50,
		
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
					delta : 0.2
				});
	
	
	var functionPlugin = new JenScript.FunctionPlugin();
	proj.registerPlugin(functionPlugin);
	
	var curve = new JenScript.Curve({
			name :'my spline curve function',
			themeColor : 'pink',
			source : splineSource
			});
	
	
	
	
	functionPlugin.addFunction(curve);
	
	
	var g1 = new JenScript.GlyphMetric({
		fontSize : 10,
		value : 2.5,
		metricsLabel : '2.5',
		fillColor: 'cyan'
	});

	curve.addMetric(g1);
	
	//TOOLS
	var tx = new JenScript.TranslatePlugin();
	proj.registerPlugin(tx);
	
	tx.select();
	
	var zw = new JenScript.ZoomWheelPlugin();
	proj.registerPlugin(zw);
	


}
