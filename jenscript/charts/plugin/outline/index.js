
function createView(container, width, height) {
	
	var view = new JenScript.View({
		name : container,
		width : width,
		height : height,
		holders : 20,
		west : 100,
		east : 80,
		south : 80,
	});
	
	var gloss = new JenScript.GlossViewForeground();

	view.addViewForeground(gloss);
	
	var proj = new JenScript.LinearProjection({
		cornerRadius : 6,
		name : "proj1",
		minX : -1200,
		maxX : 1200,
		minY : 200,
		maxY : 3600
	});
	view.registerProjection(proj);

	var outline = new JenScript.DeviceOutlinePlugin({color:'rgba(0,229,238,1)'});
	proj.registerPlugin(outline);

	var title = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'OUTLINE',
		fontSize : 14,
		textColor : 'yellow',
		xAlign : 'right',
		yAlign : 'top',
	});
	proj.registerPlugin(title);
	
}



