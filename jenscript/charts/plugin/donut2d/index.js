function createView(container, width, height) {

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


	var donutPlugin = new JenScript.Donut2DPlugin();
	proj.registerPlugin(donutPlugin);
	

	var donut = new JenScript.Donut2D({innerRadius : 80, outerRadius : 130, startAngleDegree : 45, y:0.5});
	donutPlugin.addDonut(donut);
	
	donutPlugin.translate(1000,0);

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
	
	
	donut.setOuterRadius(130);
	donut.setInnerRadius(80);
	donut.setStartAngleDegree(30);
	//donut.repaint();
	donut.shift();
	
	var comes = function (i){
		setTimeout(function(){
			donutPlugin.translate(donutPlugin.tx-100,0);
		},i*80);
	}
	
	setTimeout(function(){
		for (var i = 0; i < 10; i++) {
			comes(i);
		}
	},200);
	

	donut.setFill(new JenScript.Donut2DRadialFill());
	
	var lef = new JenScript.Donut2DLinearEffect()
	donut.addEffect(lef);
	
	var div = function (i){
		setTimeout(function(){
			s5.setDivergence(i*6);
			s2.setDivergence(i*6);
		},i*20);
		
		if(i === 9){
			donut.addEffect(new JenScript.Donut2DReflectionEffect());
		}
	}
	
	var rfx = function (i){
		setTimeout(function(){
			lef.incidence = lef.incidence + 10;
			donutPlugin.repaintPlugin();
		},i*20);
		
		if(i === 29){
			var l = new JenScript.Donut2DBorderLabel({
				text : "JenScript",
				fillColor:'rgba(0,0,0,0.3)',
				cornerRadius : 8,
				outlineWidth : 2,
				textColor :'white',
				margin : 80
			});
			
			s5.setSliceLabel(l);
			
			var l2 = new JenScript.Donut2DBorderLabel({
				text : "JavaScript",
				fillColor:'rgba(0,0,0,0.3)',
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
			for (var i = 0; i < 30; i++) {
				rfx(i);
			}
	},1000);

}