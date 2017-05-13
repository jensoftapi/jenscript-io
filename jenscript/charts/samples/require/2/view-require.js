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
		themeColor : $.RosePalette.CORALRED
	});
	var s3 = new $.PieSlice({
		name : "s3",
		value : 30,
		themeColor : 'rgba(78,148,44,1)'
	});
	var s4 = new $.PieSlice({
		name : "s4",
		value : 5,
		themeColor : $.RosePalette.AEGEANBLUE,
		divergence : 20
	});
	var s5 = new $.PieSlice({
		name : "s5",
		value : 5,
		themeColor : $.RosePalette.INDIGO
	});

	pie.addSlices([s1,s2,s3,s4,s5]);
	

	var s1Label = new $.PieRadialLabel({
		text : "Silver",
		fillColor:'black',
		outlineColor : s1.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :$.Color.lighten(s1.getThemeColor(),20),
	});
	s1.setSliceLabel(s1Label);

	var s2Label = new $.PieRadialLabel({
		text : "Platinium",
		fillColor:'black',
		outlineColor : $.Color.lighten(s2.getThemeColor(),20),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :$.Color.lighten(s2.getThemeColor(),40),
	});
	s2.setSliceLabel(s2Label);

	var s3Label = new $.PieRadialLabel({
		text : "Rhodium",
		fillColor:'black',
		outlineColor : s3.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :$.Color.lighten(s3.getThemeColor(),30),
		
	});
	s3.setSliceLabel(s3Label);

	var s4Label = new $.PieRadialLabel({
		text : "Chrome",
		fillColor:'black',
		outlineColor : s4.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :$.Color.lighten(s4.getThemeColor(),30),
	});
	s4.setSliceLabel(s4Label);

	var s5Label = new $.PieRadialLabel({
		text : "Uranium",
		fillColor:'black',
		outlineColor : $.Color.lighten(s5.getThemeColor(),30),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :$.Color.lighten(s5.getThemeColor(),50)
	});
	s5.setSliceLabel(s5Label);

	piePlugin.repaintPlugin();

	

}