
/**
 * Create pie with listener
 * 
 * @param container
 * @param width
 * @param height
 */
function createPieWithListener(container, width, height) {

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


	var piePlugin = new JenScript.PiePlugin();
	proj.registerPlugin(piePlugin);

	var pie = new JenScript.Pie({radius : 120,startAngleDegree : 45});
	pie.name = 'JenScript Pie';
	piePlugin.addPie(pie);

	var s1 = new JenScript.PieSlice({
		name : "s1",
		value : 45,
		themeColor : 'rgba(240, 240, 240, 0.9)'
	});
	var s2 = new JenScript.PieSlice({
		name : "s2",
		value : 5,
		themeColor : 'rgba(37,38,41,1)'
	});
	var s3 = new JenScript.PieSlice({
		name : "s3",
		value : 30,
		themeColor : 'rgba(78,148,44,1)'
	});
	var s4 = new JenScript.PieSlice({
		name : "s4",
		value : 5,
		themeColor : 'rgba(22,125,218, 1)'
	});
	var s5 = new JenScript.PieSlice({
		name : "s5",
		value : 5,
		themeColor : 'rgba(61,44,105,1)'
	});

	pie.addSlice(s1);
	pie.addSlice(s2);
	pie.addSlice(s3);
	pie.addSlice(s4);
	pie.addSlice(s5);
	
	
	//label for listener
	var labelPlugin = new JenScript.TextLabelPlugin();
	proj.registerPlugin(labelPlugin);
	
	var label = new JenScript.TextLabel({
		fillColor : 'black',
		outlineColor : JenScript.Color.lighten('rgb(244, 145, 26)',20),
		cornerRadius : 10,
		outlineWidth : 2,
		textColor : JenScript.Color.lighten('rgb(244, 145, 26)',20),
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
	//listener
	//event is something like, refer to source
	//event : {slice : slice, x:x,y:y, device :{x:x,y:y}}
	

	/**
	 * add Donut listener such as press, release, move, enter, exit
	 */
	piePlugin.addPieListener('enter', function(event) {
		updateText('enter',event);
		lock = true;
		setTimeout(function(){lock=false;},200);
	});
	piePlugin.addPieListener('exit', function(event) {
		updateText('exit',event);
		setTimeout(function(){updateText(undefined,event);},200);
	});
	piePlugin.addPieListener('press', function(event) {
		updateText('press',event);
	});
	piePlugin.addPieListener('release', function(event) {
		updateText('release',event);
	});
	piePlugin.addPieListener('move', function(event) {
		if(!lock)
			updateText('move',event);
	});

	var fill = new JenScript.PieDefaultFill();
	pie.setFill(fill);

	var fx0 = new JenScript.PieLinearEffect();
	pie.addEffect(fx0);
	var fxl = new JenScript.PieReflectionEffect();
	pie.addEffect(fxl);


}