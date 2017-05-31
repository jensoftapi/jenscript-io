createView = function($,container,w,h){
	
	var view = new $.View({
		name : container,
		width : w,
		height : h,
		holders : 0,
		north: 20,
		south :20,
	});


	var proj = new $.IdentityProjection();
	view.registerProjection(proj);


	var piePlugin = new $.PiePlugin();
	proj.registerPlugin(piePlugin);

	var pie = new $.Pie({radius : 120, startAngleDegree : 30});
	piePlugin.addPie(pie);

	pie.paint = false; //paint one time plugin by calling repainPlugin at end of block code section
	
	var fill = new $.PieDefaultFill();
	pie.setFill(fill);

	var fx0 = new $.PieLinearEffect();
	pie.addEffect(fx0);
	var fxl = new $.PieReflectionEffect();
	pie.addEffect(fxl);
	
	var s1 = new $.PieSlice({
		name : "s1",
		value : 45,
		themeColor : 'rgba(240, 240, 240, 0.9)',
	});
	var s2 = new $.PieSlice({
		name : "s2",
		value : 5,
		themeColor : '#c0392b'
	});
	var s3 = new $.PieSlice({
		name : "s3",
		value : 30,
		themeColor : '#16a085'
	});
	var s4 = new $.PieSlice({
		name : "s4",
		value : 5,
		themeColor : '#2980b9',
		divergence : 20
	});
	var s5 = new $.PieSlice({
		name : "s5",
		value : 5,
		themeColor : '#8e44ad'
	});

	pie.addSlices([s1,s2,s3,s4,s5]);
	

	var s1Label = new $.PieRadialLabel({
		text : "Silver",
		fillColor:'black',
		outlineColor : s1.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :s1.getThemeColor(),
	});
	s1.setSliceLabel(s1Label);

	var s2Label = new $.PieRadialLabel({
		text : "Platinium",
		fillColor:'black',
		outlineColor : s2.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :s2.getThemeColor(),
	});
	s2.setSliceLabel(s2Label);

	var s3Label = new $.PieRadialLabel({
		text : "Rhodium",
		fillColor:'black',
		outlineColor : s3.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :s3.getThemeColor(),
		
	});
	s3.setSliceLabel(s3Label);

	var s4Label = new $.PieRadialLabel({
		text : "Chrome",
		fillColor:'black',
		outlineColor : s4.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :s4.getThemeColor(),
	});
	s4.setSliceLabel(s4Label);

	var s5Label = new $.PieRadialLabel({
		text : "Uranium",
		fillColor:'black',
		outlineColor : s5.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :s5.getThemeColor()
	});
	s5.setSliceLabel(s5Label);

	piePlugin.repaintPlugin();

	

}