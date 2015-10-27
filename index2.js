var index;
var viewName;
var width;
var height;
var view;
var proj;
var donut3DPlugin;
var donut;
var s1,s2,s3,s4;
var s1Label,s2Label,s3Label,s4Label;

function sleep(ref,millis){
	
	if(ref > index){
		console.log("sleep index : "+index);
		setTimeout(function(){
			index = index+1;
			//console.log("call next index : "+(index))
			draw(viewName,width,height);
		},millis);
	}
	return (index<ref);
}


function draw(name,w,h) {
if(index === undefined)
	 index = 0;
	
// console.log("draw with index : "+index);
 viewName = name;
 width = w;
 height=h;
 
 if(index == 0){
	  console.log("draw index : "+index);
	  view = new JenScript.View({
			name : name,
			width : w,
			height : h,
			holders : 0,
			north: 20,
			south :20,
		});
		
		 proj = new JenScript.LinearProjection({
			name : "proj1",
			minX : -1,
			maxX : 1,
			minY : -1,
			maxY : 1
		});
		
		//or 
		 proj = new JenScript.IdentityProjection();
		
		//or JenScript.IdentityProjection
		view.registerProjection(proj);

		var outline = new JenScript.DeviceOutlinePlugin({
			color : 'rgb(220,220,220)'
		}); 
 }
 
 

	if(sleep(1,300))return;
	if(index == 1){
		//proj.registerPlugin(outline);
		 console.log("draw index : "+index);
		 donut3DPlugin = new JenScript.Donut3DPlugin();
		proj.registerPlugin(donut3DPlugin);

		donut = new JenScript.Donut3D({innerRadius:0,outerRadius:160,thickness : 2, startAngle : 300, tilt:0});
		donut3DPlugin.addDonut(donut);
		
		var donutFx = new JenScript.Donut3DReflectionEffect();
		//donut.addEffect(donutFx);

		//donut.tilt = 60;
		
		 s1 = new JenScript.Donut3DSlice({
			name : "s1",
			value : 45,
			themeColor : 'rgb(250, 250, 250)',
		});
		 s2 = new JenScript.Donut3DSlice({
			name : "s2",
			value : 5,
			themeColor : 'rgb(244, 145, 26)',
		});
		 s3 = new JenScript.Donut3DSlice({
			name : "s3",
			value : 30,
			themeColor : 'rgb(78, 148, 44)',
		});
		 s4 = new JenScript.Donut3DSlice({
			name : "s4",
			value : 5,
			themeColor : 'rgb(208, 58, 47)',
		});

		donut.addSlices([s1,s2,s3,s4]);
		//donut.tilt = 0;
		setTimeout(function() {
			shiftTilt = function(i,count) {
				setTimeout(function() {
					donut.tilt = i;
					donut.plugin.repaintDonuts();	
				}, count);
				
			};
			
			var count = 0;
//			for (var i = donut.tilt; i >= 0; i = i - 1) {
//				shiftTilt(i,count);
//				count = count+50;
//			}
			for (var i = 0; i <= 40; i = i + 5) {
				shiftTilt(i,count);
				count = count+30;
			}

		}, 100);

	}

	if(sleep(2,300))return;
	if(index == 2){
		 console.log("draw index : "+index);
		 s1Label = new JenScript.Donut3DBorderLabel({
			text : "JenScript",
			fillColor:'black',
			outlineColor : 'rgb(180,180,180)',
			cornerRadius : 8,
			margin: 10,
			outlineWidth : 2,
			textColor :JenScript.Color.lighten(s1.getThemeColor(),20),
		});
		s1.addSliceLabel(s1Label);
	}
	
	
	if(sleep(3,200))return;
	if(index == 3){
		 console.log("draw index : "+index);
		 s2Label = new JenScript.Donut3DBorderLabel({
			text : "SVG",
			fillColor:'black',
			outlineColor : s2.getThemeColor(),
			cornerRadius : 8,
			margin: 10,
			outlineWidth : 2,
			textColor :JenScript.Color.lighten(s2.getThemeColor(),20),
		});
		s2.addSliceLabel(s2Label);
	}
	
	
	if(sleep(4,200))return;
	if(index == 4){
		 console.log("draw index : "+index);
		 s3Label = new JenScript.Donut3DBorderLabel({
			text : "API",
			fillColor:'black',
			outlineColor : s3.getThemeColor(),
			cornerRadius : 8,
			margin: 10,
			outlineWidth : 2,
			textColor :JenScript.Color.lighten(s3.getThemeColor(),20),
		});
		s3.addSliceLabel(s3Label);
	}
	
	if(sleep(5,200))return;
	if(index == 5){
		 console.log("draw index : "+index);
		 s4Label = new JenScript.Donut3DBorderLabel({
			text : "JavaScript",
			fillColor:'black',
			outlineColor : JenScript.Color.lighten(s4.getThemeColor(),20),
			cornerRadius : 8,
			margin: 10,
			outlineWidth : 2,
			textColor :JenScript.Color.lighten(s4.getThemeColor(),20),
		});
		s4.addSliceLabel(s4Label);
		

		
	}
	
	if(sleep(6,400))return;
	if(index == 6){
		function extendsLabel(i){
			setTimeout(function(){
				s1Label.setMargin((s1Label.margin+i/2));
				s2Label.setMargin((s2Label.margin+i/2));
				s3Label.setMargin((s3Label.margin+i/2));
				s4Label.setMargin((s4Label.margin+i/2));
			},i*6);
		}
		
		for (var i = 0; i < 20; i++) {
			extendsLabel(i);
		}
	}
	
	
	
	if(sleep(7,200))return;
	if(index == 7){
		// 2 times 360 in 2 seconds with 20 repaint frames
		setTimeout(function() {
			donut.shift( 360, 2000, 20);
		}, 200);
		setTimeout(function() {
			donut.shift(-360, 500, 8);
		}, 2200);
		
	}
	
	
	if(sleep(8,2000))return;
	if(index == 8){
		function r1(r){
			setTimeout(function(){
				donut.setInnerRadius(r);
				donut.plugin.repaintDonuts();	
			},r*5);
		}
		for (var k = 0; k < 100; k=k+5) {
			r1(k);
		}
		function t(t){
			setTimeout(function(){
				donut.setThickness(t);
				//donut.plugin.repaintDonuts();	
			},t*10);
		}
		for (var k = donut.thickness; k < (donut.thickness+30); k=k+1) {
			//console.log("k :"+k)
			t(k);
		}
		
	}
	
	if(sleep(9,800))return;
	if(index == 9){
		//proj.unregisterPlugin(donut3DPlugin);
		setTimeout(function() {
			donut.shift( -30, 400, 8);
		}, 200);
		function d(r){
			setTimeout(function(){
				s3.divergence = r;
				donut.plugin.repaintDonuts();	
			},r*10);
		}
		for (var k = 0; k < 20; k=k+3) {
			d(k);
		}
	}
	
	
	
	
}


function createDonut2D(container, width, height) {

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
	

}


function createPie(container, width, height) {

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
	});
	piePlugin.addPie(pie);

	pie.paint = false; //paint one time plugin by calling repainPlugin at end of block code section
	
	var fill = new JenScript.PieDefaultFill();
	pie.setFill(fill);

	var fx0 = new JenScript.PieLinearEffect();
	pie.addEffect(fx0);
	var fxl = new JenScript.PieReflectionEffect();
	pie.addEffect(fxl);
	
	var s1 = new JenScript.PieSlice({
		name : "s1",
		value : 45,
		themeColor : 'rgba(240, 240, 240, 0.9)',
	});
	var s2 = new JenScript.PieSlice({
		name : "s2",
		value : 5,
		themeColor : JenScript.RosePalette.CORALRED,
	});
	var s3 = new JenScript.PieSlice({
		name : "s3",
		value : 30,
		opacity : 1,
		themeColor : 'rgba(78,148,44,1)',
	});
	var s4 = new JenScript.PieSlice({
		name : "s4",
		value : 5,
		themeColor : JenScript.RosePalette.AEGEANBLUE,
		divergence : 20,
		
	});
	var s5 = new JenScript.PieSlice({
		name : "s5",
		value : 5,
		themeColor : JenScript.RosePalette.INDIGO,
	});

	pie.addSlices([s1,s2,s3,s4,s5]);
	

	var s1Label = new JenScript.PieRadialLabel({
		text : "Silver",
		fillColor:'black',
		outlineColor : s1.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :JenScript.Color.lighten(s1.getThemeColor(),20),
	});
	s1.setSliceLabel(s1Label);

	var s2Label = new JenScript.PieRadialLabel({
		text : "Platinium",
		fillColor:'black',
		outlineColor : JenScript.Color.lighten(s2.getThemeColor(),20),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :JenScript.Color.lighten(s2.getThemeColor(),40),
	});
	s2.setSliceLabel(s2Label);

	var s3Label = new JenScript.PieRadialLabel({
		text : "Rhodium",
		fillColor:'black',
		outlineColor : s3.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :JenScript.Color.lighten(s3.getThemeColor(),30),
		
	});
	s3.setSliceLabel(s3Label);

	var s4Label = new JenScript.PieRadialLabel({
		text : "Chrome",
		fillColor:'black',
		outlineColor : s4.getThemeColor(),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :JenScript.Color.lighten(s4.getThemeColor(),30),
	});
	s4.setSliceLabel(s4Label);

	var s5Label = new JenScript.PieRadialLabel({
		text : "Uranium",
		fillColor:'black',
		outlineColor : JenScript.Color.lighten(s5.getThemeColor(),30),
		cornerRadius : 8,
		outlineWidth : 2,
		textColor :JenScript.Color.lighten(s5.getThemeColor(),50)
	});
	s5.setSliceLabel(s5Label);

	piePlugin.repaintPlugin();
	
}
