function create(name,w,h) {
	
 var view = new JenScript.View({
		name : name,
		width : w,
		height : h,
		holders : 0,
		north: 20,
		south :20,
	});
	
	var proj = new JenScript.IdentityProjection();
	
	view.registerProjection(proj);

	var donut3DPlugin = new JenScript.Donut3DPlugin();
	proj.registerPlugin(donut3DPlugin);

	var donut = new JenScript.Donut3D({innerRadius:100,outerRadius:150,thickness : 60, startAngle : 300, tilt:40});
	donut3DPlugin.addDonut(donut);

	donut.tilt = 60;
	
	var s1 = new JenScript.Donut3DSlice({
		name : "s1",
		value : 45,
		themeColor : 'rgb(250, 250, 250)',
	});
	var s2 = new JenScript.Donut3DSlice({
		name : "s2",
		value : 5,
		themeColor : 'rgb(244, 145, 26)',
	});
	var s3 = new JenScript.Donut3DSlice({
		name : "s3",
		value : 30,
		themeColor : 'rgb(78, 148, 44)',
	});
	var s4 = new JenScript.Donut3DSlice({
		name : "s4",
		value : 5,
		themeColor : 'rgb(208, 58, 47)',
	});

	donut.addSlices([s1,s2,s3,s4]);
	
	var s1Label = new JenScript.Donut3DBorderLabel({
		text : "JenScript",
		fillColor:'black',
		outlineColor : 'rgb(180,180,180)',
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :s1.getThemeColor(),
	});
	s1.addSliceLabel(s1Label);

	var s2Label = new JenScript.Donut3DBorderLabel({
		text : "SVG",
		fillColor:'black',
		outlineColor : s2.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :s2.getThemeColor(),
	});
	s2.addSliceLabel(s2Label);

	var s3Label = new JenScript.Donut3DBorderLabel({
		text : "API",
		fillColor:'black',
		outlineColor : s3.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :s3.getThemeColor(),
	});
	s3.addSliceLabel(s3Label);
	
	var s4Label = new JenScript.Donut3DBorderLabel({
		text : "JavaScript",
		fillColor:'black',
		outlineColor : s4.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :s4.getThemeColor(),
	});
	s4.addSliceLabel(s4Label);

	var tx1 = new JenScript.TranslatePlugin();
	proj.registerPlugin(tx1);

	tx1.select();
	
	setTimeout(function() {
		donut.shift(2 * 360, 2000, 20);
	}, 1000);
	setTimeout(function() {
		donut.shift(-200, 500, 8);
	}, 4000);
	

}