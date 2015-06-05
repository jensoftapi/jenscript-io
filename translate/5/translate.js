
/**
 * Create multiple view with synchronized translate
 * 
 * @param container
 * @param width
 * @param height
 */
function createView(container1,container2, width, height) {

	

	//view 1
	var view = new JenScript.View({
		name : container1,
		width : width,
		height : height,
		holders : 40,
		
	});

	
	var proj = new JenScript.LinearProjection({
		name : "proj1",
		minX : -1000,
		maxX : 1000,
		minY : -1000,
		maxY : 1000
	});
	view.registerProjection(proj);
	var outline = new JenScript.DeviceOutlinePlugin('darkslategrey');
	proj.registerPlugin(outline);
	var southMetrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisSouth
	});
	proj.registerPlugin(southMetrics);
	var westMetrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisWest
	});
	proj.registerPlugin(westMetrics);

	var tx1 = new JenScript.TranslatePlugin();
	tx1.registerWidget(new JenScript.TranslateCompassWidget({
		ringFillColor : JenScript.RosePalette.CHOCOLATE,
	}));
	proj.registerPlugin(tx1);

	//view 2
	var view = new JenScript.View({
		name : container2,
		width : width,
		height : height,
		holders : 40,
		
	});



	var proj = new JenScript.LinearProjection({
		name : "proj2",
		minX : -1000,
		maxX : 1000,
		minY : -1000,
		maxY : 1000
	});
	view.registerProjection(proj);
	var outline = new JenScript.DeviceOutlinePlugin('darkslategrey');
	proj.registerPlugin(outline);
	var southMetrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisSouth
	});
	proj.registerPlugin(southMetrics);
	var westMetrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisWest
	});
	proj.registerPlugin(westMetrics);

	var tx2 = new JenScript.TranslatePlugin();
	tx2.registerWidget(new JenScript.TranslateCompassWidget());
	proj.registerPlugin(tx2);

	var synchronizer = new JenScript.TranslateSynchronizer({
		translates : [ tx1, tx2 ]
	});
	tx1.select();
}