function createPie(container, width, height) {

	var view = new JenScript.View({
		name : container,
		width : width,
		height : height,
		holders : 0,
	});


	var proj = new JenScript.LinearProjection({
		name : "proj1",
		minX : -1,
		maxX : 1,
		minY : -3,
		maxY : 3
	});
	view.registerProjection(proj);


	var piePlugin = new JenScript.PiePlugin();
	proj.registerPlugin(piePlugin);
	piePlugin.translate(-1000,0);
	var pie = new JenScript.Pie({radius : 120,startAngleDegree : 45,y : 0.5});
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
	
	
	var s1Label = new JenScript.PieRadialLabel({
		//Id :'myLabel1',
		text : "SVG",
		fillColor:'black',
		outlineColor : s1.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :s1.getThemeColor(),
	});
	s1.setSliceLabel(s1Label);

	var s2Label = new JenScript.PieRadialLabel({
		//Id :'myLabel2',
		text : "Javascript",
		fillColor:'black',
		outlineColor : s2.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :s2.getThemeColor(),
	});
	s2.setSliceLabel(s2Label);

	var s3Label = new JenScript.PieRadialLabel({
		//Id :'myLabel3',
		text : "Visualization",
		fillColor:'black',
		outlineColor : s3.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :s3.getThemeColor(),
		
	});
	s3.setSliceLabel(s3Label);

	var s4Label = new JenScript.PieRadialLabel({
		//Id :'myLabel4',
		text : "Library",
		fillColor:'black',
		outlineColor : s4.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :s4.getThemeColor(),
	});
	s4.setSliceLabel(s4Label);

	var s5Label = new JenScript.PieRadialLabel({
		//Id :'myLabel5',
		text : "JenScript",
		fillColor:'black',
		outlineColor : s5.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :s5.getThemeColor()
	});
	s5.setSliceLabel(s5Label);
	
	pie.setRadius(120);
	pie.setStartAngleDegree(30);
	var fill = new JenScript.PieDefaultFill();
	pie.setFill(fill);
	
	
	var fx0 = new JenScript.PieLinearEffect({offset : 5});
	pie.addEffect(fx0);
	
	piePlugin.repaintPlugin();
	//pie.shift();
	var comes = function (i){
		setTimeout(function(){
			piePlugin.translate(piePlugin.tx+100,0);
		},i*80);
	}
	
	setTimeout(function(){
		for (var i = 0; i < 10; i++) {
			comes(i);
		}
	},200);
	


	
	
	var div = function (i){
		setTimeout(function(){
			s5.setDivergence(i*6);
			s2.setDivergence(i*6);
			//piePlugin.repaintPlugin();
		},i*20);
		
		if(i === 9){
			var fxl = new JenScript.PieReflectionEffect();
			//fx0.incidence = 120;
			pie.addEffect(fxl);
			//piePlugin.repaintPlugin();
		}
	}
	
	var rfx = function (i){
		setTimeout(function(){
			fx0.incidence = fx0.incidence + 10;
			piePlugin.repaintPlugin();
		},i*20);
		
		if(i === 29){
			var l = new JenScript.PieBorderLabel({
				text : "JenScript",
				fillColor:'rgba(0,0,0,0.3)',
				outlineColor : '#3498db',
				cornerRadius : 8,
				outlineWidth : 2,
				textColor :'white',
				margin : 80
			});
			
			s5.setSliceLabel(l);
			
			var l2 = new JenScript.PieBorderLabel({
				text : "JavaScript",
				fillColor:'rgba(0,0,0,0.3)',
				outlineColor : '#3498db',
				cornerRadius : 8,
				outlineWidth : 2,
				textColor :'white',
				margin : 80
			});
			
			s2.setSliceLabel(l2);
			
			setTimeout(function(){
				for (var i = 0; i < 10; i++) {
					div(i);
				}
			},50);
		}
		
	}	
		
		
		
	
	setTimeout(function(){
		//piePlugin.translate(-10,0);
			for (var i = 0; i < 30; i++) {
				rfx(i);
			}
		
	},1000);
	
	

}