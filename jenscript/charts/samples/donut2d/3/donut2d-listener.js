
/**
 * Create donut2d with listener
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

	var donutPlugin = new JenScript.Donut2DPlugin();
	proj.registerPlugin(donutPlugin);

	var donut = new JenScript.Donut2D({innerRadius : 80, outerRadius : 120, startAngleDegree : 45});
	donutPlugin.addDonut(donut);
	
	donut.setFill(new JenScript.Donut2DRadialFill());
	donut.addEffect(new JenScript.Donut2DLinearEffect());
	donut.addEffect(new JenScript.Donut2DReflectionEffect());

	var s1 = new JenScript.Donut2DSlice({
		name : "s1",
		value : 45,
		themeColor : 'rgba(240, 240, 240, 0.9)'
	});
	var s2 = new JenScript.Donut2DSlice({
		name : "s2",
		value : 5,
		themeColor : 'rgba(37,38,41,1)'
	});
	var s3 = new JenScript.Donut2DSlice({
		name : "s3",
		value : 30,
		themeColor : 'rgba(78,148,44,1)'
	});
	var s4 = new JenScript.Donut2DSlice({
		name : "s4",
		value : 5,
		themeColor : 'rgba(22,125,218, 1)'
	});
	var s5 = new JenScript.Donut2DSlice({
		name : "s5",
		value : 5,
		themeColor : 'rgba(61,44,105,1)'
	});

	donut.addSlice(s1);
	donut.addSlice(s2);
	donut.addSlice(s3);
	donut.addSlice(s4);
	donut.addSlice(s5);
	
	var labelPlugin = new JenScript.TextLabelPlugin();
	proj.registerPlugin(labelPlugin);
	
	var label = new JenScript.TextLabel({
		fillColor : 'black',
		outlineColor : 'rgb(244, 145, 26)',
		cornerRadius : 10,
		outlineWidth : 2,
		textColor : 'rgb(244, 145, 26)',
		fontSize : 16
	});
	labelPlugin.addLabel(label);

	var updateText = function(action, point) {
		label.setText(action);
		label.setX(point.device.x);
		label.setY(point.device.y);
		labelPlugin.repaintPlugin();
	};
	
	var lock = false;

	donutPlugin.addDonutListener('enter', function(event) {
		updateText('enter',event);
		lock = true;
		setTimeout(function(){lock=false;},200);
	});
	donutPlugin.addDonutListener('exit', function(event) {
		updateText('exit',event);
		setTimeout(function(){updateText(undefined,event);},200);
	});
	donutPlugin.addDonutListener('press', function(event) {
		updateText('press',event);
	});
	donutPlugin.addDonutListener('release', function(event) {
		updateText('release',event);
	});
	donutPlugin.addDonutListener('move', function(event) {
		if(!lock)
			updateText('move',event);
	});
}