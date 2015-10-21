function create(name,w,h) {
	
 var view = new JenScript.View({
		name : name,
		width : w,
		height : h,
		holders : 0,
		north: 20,
		south :20,
	});
	
	var proj = new JenScript.LinearProjection({
		name : "proj1",
		minX : -1,
		maxX : 1,
		minY : -1,
		maxY : 1
	});
	
	//or 
	var proj = new JenScript.IdentityProjection();
	
	//or JenScript.IdentityProjection
	view.registerProjection(proj);

	var outline = new JenScript.DeviceOutlinePlugin({
		color : 'rgb(220,220,220)'
	});

	//proj.registerPlugin(outline);

	var donut3DPlugin = new JenScript.Donut3DPlugin();
	proj.registerPlugin(donut3DPlugin);

	var donut = new JenScript.Donut3D({innerRadius:100,outerRadius:150,thickness : 60, startAngle : 300, tilt:40});
	donut3DPlugin.addDonut(donut);
	
	var donutFx = new JenScript.Donut3DReflectionEffect();
	donut.addEffect(donutFx);

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
		textColor :JenScript.Color.lighten(s1.getThemeColor(),20),
	});
	s1.addSliceLabel(s1Label);

	var s2Label = new JenScript.Donut3DBorderLabel({
		text : "SVG",
		fillColor:'black',
		outlineColor : s2.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :JenScript.Color.lighten(s2.getThemeColor(),20),
	});
	s2.addSliceLabel(s2Label);

	var s3Label = new JenScript.Donut3DBorderLabel({
		text : "API",
		fillColor:'black',
		outlineColor : s3.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :JenScript.Color.lighten(s3.getThemeColor(),20),
	});
	s3.addSliceLabel(s3Label);
	
	var s4Label = new JenScript.Donut3DBorderLabel({
		text : "JavaScript",
		fillColor:'black',
		outlineColor : JenScript.Color.lighten(s4.getThemeColor(),20),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :JenScript.Color.lighten(s4.getThemeColor(),20),
	});
	s4.addSliceLabel(s4Label);

	var tx1 = new JenScript.TranslatePlugin();
	proj.registerPlugin(tx1);

	tx1.select();
	
}