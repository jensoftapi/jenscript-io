
function create(container, width, height) {

	var view = new JenScript.View({
		name : container,
		width : width,
		height : height,
		holders : 0,
		north: 20,
		south :20,
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

	var pie = new JenScript.Pie({
		radius : 120, 
		startAngleDegree : 30,
		opacity: 1,
		Id :'myPie'
	});
	piePlugin.addPie(pie);

	pie.paint = false; //paint one time plugin by calling repainPlugin at end of block code section
	
	var fill = new JenScript.PieDefaultFill({Id : 'MyFill'});
	pie.setFill(fill);

	var fx0 = new JenScript.PieLinearEffect({Id : 'MyLinearFX'});
	pie.addEffect(fx0);
	var fxl = new JenScript.PieReflectionEffect({Id : 'MyReflectFX'});
	pie.addEffect(fxl);
	
	var s1 = new JenScript.PieSlice({
		name : "s1",
		value : 45,
		themeColor : 'rgba(240, 240, 240, 0.9)',
		Id :'mySlice1'
	});
	var s2 = new JenScript.PieSlice({
		name : "s2",
		value : 5,
		themeColor : '#d35400',
		Id :'mySlice2'
	});
	var s3 = new JenScript.PieSlice({
		name : "s3",
		value : 30,
		opacity : 1,
		themeColor : 'rgba(78,148,44,1)',
		Id : 'mySlice3'
	});
	var s4 = new JenScript.PieSlice({
		name : "s4",
		value : 5,
		themeColor : '#2980b9',
		divergence : 20,
		Id :'mySlice4'
		
	});
	var s5 = new JenScript.PieSlice({
		name : "s5",
		value : 5,
		themeColor : '#8e44ad',
		Id :'mySlice5'
	});

	pie.addSlices([s1,s2,s3,s4,s5]);
	

	var s1Label = new JenScript.PieRadialLabel({
		Id :'myLabel1',
		text : "Silver",
		fillColor:'black',
		outlineColor : s1.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :s1.getThemeColor(),
	});
	s1.setSliceLabel(s1Label);

	var s2Label = new JenScript.PieRadialLabel({
		Id :'myLabel2',
		text : "Platinium",
		fillColor:'black',
		outlineColor : s2.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :s2.getThemeColor(),
	});
	s2.setSliceLabel(s2Label);

	var s3Label = new JenScript.PieRadialLabel({
		Id :'myLabel3',
		text : "Rhodium",
		fillColor:'black',
		outlineColor : s3.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :s3.getThemeColor(),
		
	});
	s3.setSliceLabel(s3Label);

	var s4Label = new JenScript.PieRadialLabel({
		Id :'myLabel4',
		text : "Chrome",
		fillColor:'black',
		outlineColor : s4.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :s4.getThemeColor(),
	});
	s4.setSliceLabel(s4Label);

	var s5Label = new JenScript.PieRadialLabel({
		Id :'myLabel5',
		text : "Uranium",
		fillColor:'black',
		outlineColor : s5.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :s5.getThemeColor()
	});
	s5.setSliceLabel(s5Label);

	piePlugin.repaintPlugin();
	piePlugin.repaintPlugin();
	piePlugin.repaintPlugin();
	piePlugin.repaintPlugin();
	
}
