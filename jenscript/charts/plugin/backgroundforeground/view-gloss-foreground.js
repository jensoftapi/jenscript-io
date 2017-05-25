
/**
 * Create view with gloss foreground
 * 
 * @param container
 * @param width
 * @param height
 */
function createViewGlossForeground(container, width, height) {
	var view = new JenScript.View({
		name : container,
		width : width,
		height : height,
		holders : 20,
		
	});
	
	var proj = new JenScript.LinearProjection({
		name : "proj1",
		minX : -1000,
		maxX : 1000,
		minY : -1000,
		maxY : 1000
	});
	view.registerProjection(proj);


	var textureBackground = new JenScript.TexturedViewBackground({
		opacity : 0.2,
		texture : JenScript.Texture.getTriangleCarbonFiber(),
	});
	view.addViewBackground(textureBackground);
	
	var bg1 = new JenScript.GradientViewBackground({
		opacity : 0.6,
		shader : {percents :['0%','100%'],colors:['rgb(250, 88, 0)','black']}
	});
	view.addViewBackground(bg1);

	var gloss = new JenScript.GlossViewForeground();

	view.addViewForeground(gloss);

	var outline = new JenScript.DeviceOutlinePlugin({color : 'white'});
	proj.registerPlugin(outline);
}