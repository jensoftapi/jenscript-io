
function createSymbolBarView(container, width, height) {

	var view = new JenScript.View({
		name : container,
		width : width,
		height : height,
		
		west : 80,
		south:60
	});
	
	var proj = new JenScript.LinearProjection({
		name : "proj",
		policy : {paint : 'ACTIVE'},
		minX : 0,
		maxX : 0,
		minY : -100,
		maxY : 1200
	});
	view.registerProjection(proj);

	var outline = new JenScript.DeviceOutlinePlugin({
		color : 'pink'
	});

	proj.registerPlugin(outline);
	
	var minor = {
			tickMarkerSize : 2,
			tickMarkerColor : 'yellow',
			tickMarkerStroke : 1
	};
	var median = {
		tickMarkerSize : 4,
		tickMarkerColor : '#d35400',
		tickMarkerStroke : 1.2,
		tickTextColor : '#d35400',
		tickTextFontSize : 10
	};
	var major = {
		tickMarkerSize : 8,
		tickMarkerColor : '#2980b9',
		tickMarkerStroke : 3,
		tickTextColor : '#2980b9',
		tickTextFontSize : 12,
		tickTextOffset : 16
	};
	
	var metrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisWest,
		minor:minor,
		median:median,
		major:major
	});
	proj.registerPlugin(metrics);
	
	var gridPlugin = new JenScript.GridModeledPlugin({
		gridOrientation : 'Horizontal',
		gridColor : 'white',
		gridWidth : 0.5,
		gridOpacity : 0.5
	});
	proj.registerPlugin(gridPlugin);
	
	//TOOL
	var tx1 = new JenScript.TranslatePlugin({
		mode : 'ty',
	});
	proj.registerPlugin(tx1);
	tx1.registerWidget(new JenScript.TranslateCompassWidget({
		ringFillColor : 'pink'
	}));
	tx1.select();
	
	var zoomwheel = new JenScript.ZoomWheelPlugin({
		mode : 'wheelY'
	});
	proj.registerPlugin(zoomwheel);
	
	var symbolPlugin = new JenScript.SymbolPlugin({
		nature : 'Vertical'
	});
	proj.registerPlugin(symbolPlugin);
	
	// arbitrary values between min max values
	var random = function getRandomArbitrary(min, max) {
	  return Math.random() * (max - min) + min;
	}
	
	barValue = function (){
		return random(200,800);
	}
	
	stackValue = function (){
		return random(20,60);
	}
	
	//symbol factory
	var createBar = function(val){
		var symbol = new JenScript.SymbolBarStacked({
			base : 0,
			value: val,
			thickness : 32,
			direction : 'ascent',
			morpheStyle : 'Round',
			themeColor : '#c0392b',
			opacity : 1,
			barFill : new JenScript.SymbolBarFill0({}),
			barEffect  : new JenScript.SymbolBarEffect0({}),
		});
		
		
		var  s1 = new JenScript.SymbolStack({
			name : 'stack1',
			themeColor : 'rgb(91, 151, 168)',
			stackValue : stackValue()
		});
		var  s2 = new JenScript.SymbolStack({
			name : 'stack2',
			themeColor : 'rgb(128, 182, 191)',
			stackValue : stackValue()
		});
		var  s3 = new JenScript.SymbolStack({
			name : 'stack3',
			themeColor : 'rgb(22, 125, 218)',
			stackValue : stackValue()
		});
		
		symbol.addStack(s1);
		symbol.addStack(s2);
		symbol.addStack(s3);
		
		return symbol;
	}
	
	//layer
	var barLayer = new JenScript.SymbolBarLayer();
	symbolPlugin.addLayer(barLayer);
	

	
	//lay out
	barLayer.addSymbol(JenScript.SymbolFiller.createGlue(),false); //glue stretch
	for (var i = 1; i <= 10; i++) {
		var bar = createBar(barValue());
		barLayer.addSymbol(bar,false);
		
		if(i < 10)
		barLayer.addSymbol(JenScript.SymbolFiller.createStrut(20),false); //glue rigid except after last bar
	}
	barLayer.addSymbol(JenScript.SymbolFiller.createGlue(),false);//glue stretch
	
	//invoke repaint only one time
	symbolPlugin.repaintPlugin();
	
}
