
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
 * Create views with zoom lens synchronized in 2 views
 * 
 * @param container
 * @param width
 * @param height
 */
function createView(container1,container2, width, height) {

	
	
	var view1 = new JenScript.View({
		name : container1,
		width : width,
		height : height,
		west : 60,
		south:60
		
	});

	var proj1 = new JenScript.LinearProjection({
		name : container2,
		minX : -1000,
		maxX : 1000,
		minY : -1000,
		maxY : 1000
	});
	view1.registerProjection(proj1);
	
	
	var outline = new JenScript.DeviceOutlinePlugin({color : 'darkslategrey'});
	proj1.registerPlugin(outline);
	
	var legend1 = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'View 1 Synch.',
		fontSize : 8,
		textColor : 'purple',
		xAlign : 'right',
		yAlign : 'top',
	});
	proj1.registerPlugin(legend1);
	
	minor = {
			tickMarkerSize : 2,
			tickMarkerColor : JenScript.RosePalette.AEGEANBLUE,
			tickMarkerStroke : 1
		};
		median = {
			tickMarkerSize : 4,
			tickMarkerColor : JenScript.RosePalette.EMERALD,
			tickMarkerStroke : 1.2,
			tickTextColor : JenScript.RosePalette.EMERALD,
			tickTextFontSize : 10
		};
		major = {
			tickMarkerSize : 8,
			tickMarkerColor : JenScript.RosePalette.CORALRED,
			tickMarkerStroke : 3,
			tickTextColor : JenScript.RosePalette.CORALRED,
			tickTextFontSize : 12,
			//tickTextOffset : 16
		};
		var southMetrics1 = new JenScript.AxisMetricsModeled({
			axis : JenScript.Axis.AxisSouth,
			minor:minor,
			median:median,
			major:major
		});
		proj1.registerPlugin(southMetrics1);

		var westMetrics1 = new JenScript.AxisMetricsModeled({
			axis : JenScript.Axis.AxisWest,
			minor:minor,
			median:median,
			major:major
		});
		proj1.registerPlugin(westMetrics1);

	var lens1 = new JenScript.ZoomLensPlugin();
	proj1.registerPlugin(lens1);

	var lx1 = new JenScript.LensX({
		buttonStrokeWidth : 2,
		buttonDrawColor : JenScript.RosePalette.MANDARIN,
		buttonRolloverDrawColor:JenScript.RosePalette.CORALRED,
	});
	lens1.registerWidget(lx1);

	
	
	var view2 = new JenScript.View({
		name : container2,
		width : width,
		height : height,
		west : 60,
		south:60
	});

	var proj2 = new JenScript.LinearProjection({
		name : "proj2",
		minX : -1000,
		maxX : 1000,
		minY : -1000,
		maxY : 1000
	});
	view2.registerProjection(proj2);
	
	var legend2 = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'View 2 Synch.',
		fontSize : 8,
		textColor : 'purple',
		xAlign : 'right',
		yAlign : 'top',
	});
	proj2.registerPlugin(legend2);
	
	var outline2 = new JenScript.DeviceOutlinePlugin({color : 'darkslategrey'});
	proj2.registerPlugin(outline2);
	

	var southMetrics2 = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisSouth,
		minor:minor,
		median:median,
		major:major,
	});
	proj2.registerPlugin(southMetrics2);

	var westMetrics2 = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisWest,
		minor:minor,
		median:median,
		major:major
	});
	proj2.registerPlugin(westMetrics2);

	var lens2 = new JenScript.ZoomLensPlugin();
	proj2.registerPlugin(lens2);

	var lx2 = new JenScript.LensX({
		buttonStrokeWidth : 2,
		buttonDrawColor : JenScript.RosePalette.MANDARIN,
		buttonRolloverDrawColor:JenScript.RosePalette.CORALRED,
	});
	lens2.registerWidget(lx2);

	var synchronizer = new JenScript.ZoomLensSynchronizer({
		lenses : [ lens1, lens2 ]
	});
	lens1.select();
}