
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
	
/**
 * Create view with translate
 * 
 * @param container
 * @param width
 * @param height
 */
function createView(container, width, height) {

	var view = new JenScript.View({
		name : container,
		width : width,
		height : height,
		holders : 10,
		west : 80,
		south :80
	});


	// Projection1
	var proj = new JenScript.LinearProjection({
		name : "proj",
		minX : 0,
		maxX : 1000,
		minY : 0,
		maxY : 1500
	});

	view.registerProjection(proj);
	var outline = new JenScript.DeviceOutlinePlugin({color : 'darkslategrey'});
	proj.registerPlugin(outline);
	var southMetrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisSouth,
		minor:minor,
		median:median,
		major:major
	});
	proj.registerPlugin(southMetrics);
	// southMetrics.setTickMarkerSize('minor',8);
	southMetrics.setTickTextFontSize('major', 10);
	southMetrics.setTickTextFontSize('median', 8);

	var westMetrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisWest,
		minor:minor,
		median:median,
		major:major
	});
	proj.registerPlugin(westMetrics);
	
	//PIE
	var piePlugin = new JenScript.PiePlugin();
	proj.registerPlugin(piePlugin);

	var pie = new JenScript.Pie({radius : 20, startAngleDegree : 30,x:600,y:700});
	piePlugin.addPie(pie);

	var fill = new JenScript.PieDefaultFill();
	pie.setFill(fill);

	var fx0 = new JenScript.PieLinearEffect({offset : 2});
	pie.addEffect(fx0);
	
	var s1 = new JenScript.PieSlice({
		name : "s1",
		value : 45,
		themeColor : 'rgba(240, 240, 240, 0.9)',
	});
	var s2 = new JenScript.PieSlice({
		name : "s2",
		value : 5,
		themeColor : '#e74c3c'
	});
	var s3 = new JenScript.PieSlice({
		name : "s3",
		value : 30,
		themeColor : 'rgba(78,148,44,1)'
	});
	var s4 = new JenScript.PieSlice({
		name : "s4",
		value : 5,
		themeColor : '#2980b9',
	});
	var s5 = new JenScript.PieSlice({
		name : "s5",
		value : 5,
		themeColor : '#16a085'
	});

	pie.addSlices([s1,s2,s3,s4,s5]);


	//CURVE FUNCTION 
	var xValues = [ -100, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1200 ];
	var yValues = [ 600, 200, 1500, 200, 350, 610, 420, 850, 990, 1200, 800 ];
	var splineSource = new JenScript.SplineSource({
					nature : 'XFunction',
					xValues : xValues,
					yValues : yValues,
					delta : 10 //important to have delta that not produce two much interpolation point, be care full
				});
	
	
	var functionPlugin = new JenScript.FunctionPlugin();
	proj.registerPlugin(functionPlugin);
	
	var curve = new JenScript.Curve({
			name :'my spline curve function',
			themeColor : 'pink',
			source : splineSource
			});
	
	functionPlugin.addFunction(curve);
	

	var translate = new JenScript.TranslatePlugin({mode : 'x'});
	proj.registerPlugin(translate);
	
	var percents = ['0%','50%','100%'];
	var colors = ['#34495e','black','#34495e'];
	var opacity  = [0.8,0.8,0.8];
	var tx = new JenScript.TranslateX({
		width : 60,
		height :  16,
		outlineStrokeColor : '#e74c3c',
		outlineStrokeWidth : 2,
		shader : {percents : percents, colors : colors,opacity:opacity},
		buttonFillColor :  '#f1c40f',
		buttonStrokeWidth : 1,
		buttonRolloverFillColor : '#bdc3c7',
	});
	translate.registerWidget(tx);
	
	translate.select();
}