/**
 * Create view with spline area x function
 * 
 * @param container
 * @param width
 * @param height
 */
function createViewStackSplineMultipleAreaXFunction(container, width, height) {
	
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
		minX : 3.4,
		maxX : 10.4,
		minY : 0,
		maxY : 24
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
			tickMarkerColor : '#3498db',
			tickMarkerStroke : 3,
			tickTextColor : '#3498db',
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
	var xValues1 = [ -2, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,12 ];
	var yValues1 = [ 0, 4, 1.8, 12, 1.9, 3.4, 4.1, 4.2, 6.5, 7.9, 10, 8,0 ];
	var splineSource1 = new JenScript.SplineSource({
					nature : 'XFunction',
					xValues : xValues1,
					yValues : yValues1,
					delta : 0.2
				});
	
	var xValues2 = [-2, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,12 ];
	var yValues2 = [ 2, 8, 3, 18, 4, 6, 8, 7, 10, 12, 14, 10,2 ];
	var splineSource2 = new JenScript.SplineSource({
					nature : 'XFunction',
					xValues : xValues2,
					yValues : yValues2,
					delta : 0.2
				});
	
	
	var xValues3 = [-2, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,12 ];
	var yValues3 = [ 5, 18, 8, 22, 8, 10, 12, 9, 12, 15, 18, 13,6 ];
	var splineSource3 = new JenScript.SplineSource({
					nature : 'XFunction',
					xValues : xValues3,
					yValues : yValues3,
					delta : 0.2
				});
	
	
	
	
	var functionPlugin = new JenScript.FunctionPlugin();
	proj.registerPlugin(functionPlugin);
	
	var area1 = new JenScript.Area({
			name :'my area function',
			themeColor : 'pink',
			source : splineSource1,
			areaBase : 0,
			shader : {percents : [ '0%', '100%' ],opacity:[1,0.2], colors : ['rgb(236, 240, 241)','rgb(236, 240, 241)']}
			});
	
	var area2 = new JenScript.Area({
		name :'my area function 2',
		//themeColor : 'skyblue',
		source : splineSource2,
		areaBase : 0,
		shader : {percents : [ '0%', '100%' ],opacity:[1,0.2], colors : ['	rgb(230, 126, 34)','rgb(230, 126, 34)']}
	});
	
	var area3 = new JenScript.Area({
		name :'my area function 2',
		//themeColor : 'skyblue',
		source : splineSource3,
		areaBase : 0,
		shader : {percents : [ '0%', '100%' ],opacity:[1,0.2], colors : ['rgb(41, 128, 185)','rgb(41, 128, 185)']}
	});
	
	functionPlugin.addFunction(area3);
	functionPlugin.addFunction(area2);
	functionPlugin.addFunction(area1);
	
	var curve1 = new JenScript.Curve({
		name :'my spline curve function',
		themeColor : 'pink',
		source : splineSource1
	});
	
	var curve2 = new JenScript.Curve({
		name :'my spline curve function',
		themeColor : 'pink',
		source : splineSource2
	});

	var curve3 = new JenScript.Curve({
		name :'my spline curve function',
		themeColor : 'pink',
		source : splineSource3
	});


	functionPlugin.addFunction(curve1);
	functionPlugin.addFunction(curve2);
	functionPlugin.addFunction(curve3);
	
	var scatter1 = new JenScript.Scatter({
		name :'my scatter function',
		themeColor : 'orange',
		source : splineSource1
		});
	
	var scatter2 = new JenScript.Scatter({
		name :'my scatter function',
		themeColor : 'blue',
		source : splineSource2
		});
	
	var scatter3 = new JenScript.Scatter({
		name :'my scatter function',
		themeColor : 'green',
		source : splineSource3
		});
	
	functionPlugin.addFunction(scatter1);
	functionPlugin.addFunction(scatter2);
	functionPlugin.addFunction(scatter3);
	
	
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
