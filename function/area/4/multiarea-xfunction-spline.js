
/**
 * Create view with spline area x function
 * 
 * @param container
 * @param width
 * @param height
 */
function createViewSplineMultipleAreaXFunction(container, width, height) {
	
	var view = new JenScript.View({
		name : container,
		width : width,
		height : height,
		holders : 40,
		west : 70,
		south:50,
		
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

	//METRICS
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
			tickTextFontSize : 10
		};
		var major = {
			tickMarkerSize : 8,
			tickMarkerColor : JenScript.Color.brighten(JenScript.RosePalette.CALYPSOBLUE),
			tickMarkerStroke : 3,
			tickTextColor : JenScript.Color.brighten(JenScript.RosePalette.CALYPSOBLUE),
			tickTextFontSize : 12
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
	var xValues1 = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
	var yValues1 = [ 6, 1.8, 15, 1.9, 3.4, 6.1, 4.2, 8.5, 9.9, 12, 8 ];
	var splineSource1 = new JenScript.SplineSource({
					nature : 'XFunction',
					xValues : xValues1,
					yValues : yValues1,
					delta : 0.2
				});
	
	var xValues2 = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
	var yValues2 = [ 6,3, 9, 4, 8, 3, 4, 1, 14, 8, 4 ];
	var splineSource2 = new JenScript.SplineSource({
					nature : 'XFunction',
					xValues : xValues2,
					yValues : yValues2,
					delta : 0.2
				});
	
	
	
	var functionPlugin = new JenScript.FunctionPlugin();
	proj.registerPlugin(functionPlugin);
	
	var area1 = new JenScript.Area({
			name :'my area function',
			themeColor : 'pink',
			source : splineSource1,
			areaBase : 0,
			});
	
	var area2 = new JenScript.Area({
		name :'my area function 2',
		themeColor : 'skyblue',
		source : splineSource2,
		areaBase : 0,
	});
	
	functionPlugin.addFunction(area1);
	functionPlugin.addFunction(area2);
	
	//TOOLS
	var tx = new JenScript.TranslatePlugin();
	proj.registerPlugin(tx);
	
	tx.select();
	
	var zw = new JenScript.ZoomWheelPlugin();
	proj.registerPlugin(zw);
	


}
