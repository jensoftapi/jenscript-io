function create(container, width, height) {

	var view = new JenScript.View({
		name : container,
		width : width,
		height : 400,
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
	view.registerProjection(proj);


	var donut2DPlugin = new JenScript.Donut2DPlugin();
	proj.registerPlugin(donut2DPlugin);

	var donut = new JenScript.Donut2D({innerRadius :  80,outerRadius :  120});
	donut2DPlugin.addDonut(donut);

	donut.setFill(new JenScript.Donut2DRadialFill());
	donut.addEffect(new JenScript.Donut2DLinearEffect());
	donut.addEffect(new JenScript.Donut2DReflectionEffect());

	var s1 = new JenScript.Donut2DSlice({
		name : "s1",
		value : 45,
		themeColor : 'rgb(240,240,240)'
	});
	var s2 = new JenScript.Donut2DSlice({
		name : "s2",
		value : 5,
		themeColor : 'rgb(237, 54, 162)'
	});
	var s3 = new JenScript.Donut2DSlice({
		name : "s3",
		value : 30,
		themeColor : 'rgb(244, 145, 26)'
	});
	var s4 = new JenScript.Donut2DSlice({
		name : "s4",
		value : 5,
		themeColor : 'rgb(22,125,218)'
	});
	var s5 = new JenScript.Donut2DSlice({
		name : "s5",
		value : 5,
		themeColor : 'rgba(61,44,105,1)'
	});

	
	donut.addSlices([s1,s2,s3,s4,s5]);

	var s1Label = new JenScript.Donut2DRadialLabel({
		text : "Silver",
		fillColor:'black',
		outlineColor : 'rgb(180,180,180)',
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :s1.getThemeColor(),
	});
	s1.setSliceLabel(s1Label);

	var s2Label = new JenScript.Donut2DRadialLabel({
		text : "Platinium",
		fillColor:'black',
		outlineColor : s2.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :s2.getThemeColor(),
	});
	s2.setSliceLabel(s2Label);

	var s3Label = new JenScript.Donut2DRadialLabel({
		text : "Rhodium",
		fillColor:'black',
		outlineColor : s3.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :s3.getThemeColor(),
		
	});
	s3.setSliceLabel(s3Label);

	var s4Label = new JenScript.Donut2DRadialLabel({
		text : "Gold",
		fillColor:'black',
		outlineColor : s4.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :s4.getThemeColor(),
	});
	s4.setSliceLabel(s4Label);

	var s5Label = new JenScript.Donut2DRadialLabel({
		text : "Uranium",
		fillColor:'black',
		outlineColor : s5.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :s5.getThemeColor()
	});
	s5.setSliceLabel(s5Label);

	
	var tx1 = new JenScript.TranslatePlugin();
	proj.registerPlugin(tx1);

	tx1.select();
}

