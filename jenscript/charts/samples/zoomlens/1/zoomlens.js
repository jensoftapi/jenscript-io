
var indigo = JenScript.RosePalette.INDIGO;
var choco = JenScript.RosePalette.CHOCOLATE;
var emerald = JenScript.RosePalette.EMERALD;
var aegean = JenScript.RosePalette.AEGEANBLUE;
var minor = {
	tickMarkerSize : 2,
	tickMarkerColor : JenScript.RosePalette.AEGEANBLUE,
	tickMarkerStroke : 1
};
var median = {
	tickMarkerSize : 4,
	tickMarkerColor : JenScript.RosePalette.EMERALD,
	tickMarkerStroke : 1.2,
	tickTextColor : JenScript.RosePalette.EMERALD,
	tickTextFontSize : 10
};
var major = {
	tickMarkerSize : 8,
	tickMarkerColor : JenScript.Color.lighten(choco,20),
	tickMarkerStroke : 3,
	tickTextColor : JenScript.Color.lighten(choco,20),
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
	var outline = new JenScript.DeviceOutlinePlugin('darkslategrey');
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
		themeColor : JenScript.RosePalette.CORALRED
	});
	var s3 = new JenScript.PieSlice({
		name : "s3",
		value : 30,
		themeColor : 'rgba(78,148,44,1)'
	});
	var s4 = new JenScript.PieSlice({
		name : "s4",
		value : 5,
		themeColor : JenScript.RosePalette.AEGEANBLUE,
	});
	var s5 = new JenScript.PieSlice({
		name : "s5",
		value : 5,
		themeColor : JenScript.RosePalette.INDIGO
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
			themeColor : JenScript.Color.lighten(choco,40),
			strokeWidth : 1.2,
			source : splineSource
			});
	
	functionPlugin.addFunction(curve);
	

	var lens = new JenScript.ZoomLensPlugin();
	proj.registerPlugin(lens);

	var percents = ['0%','50%','100%'];
	var colors = [choco,JenScript.RosePalette.COALBLACK,choco];
	var opacity  = [0.8,0.8,0.8];
	
	var lx = new JenScript.LensX({
		width : 60,
		height :  16,
		outlineStrokeColor : JenScript.RosePalette.FOXGLOWE,
		outlineStrokeWidth : 2,
		shader : {percents : percents, colors : colors,opacity:opacity},
		//outlineFillColor : 'white',
		buttonFillColor :  JenScript.Color.lighten(JenScript.RosePalette.CHOCOLATE,40),
		buttonDrawColor :  JenScript.Color.lighten(JenScript.RosePalette.CHOCOLATE,40),
		buttonStrokeWidth : 2,
		buttonRolloverFillColor : JenScript.Color.lighten(JenScript.RosePalette.CHOCOLATE,70),
		buttonRolloverDrawColor : JenScript.Color.lighten(JenScript.RosePalette.CHOCOLATE,70),
	});
	lens.registerWidget(lx);
	
	var ly = new JenScript.LensY({
		width : 16,
		height :  60,
		outlineStrokeColor : JenScript.RosePalette.FOXGLOWE,
		outlineStrokeWidth : 2,
		shader : {percents : percents, colors : colors,opacity:opacity},
		//outlineFillColor : 'white',
		buttonFillColor :  JenScript.Color.lighten(JenScript.RosePalette.CHOCOLATE,40),
		buttonDrawColor :  JenScript.Color.lighten(JenScript.RosePalette.CHOCOLATE,40),
		buttonStrokeWidth : 2,
		buttonRolloverFillColor : JenScript.Color.lighten(JenScript.RosePalette.CHOCOLATE,70),
		buttonRolloverDrawColor : JenScript.Color.lighten(JenScript.RosePalette.CHOCOLATE,70),
	});
	lens.registerWidget(ly);

	lens.select();

}