
/**
 * createSymbolView
 * 
 * @param container
 * @param width
 * @param height
 */
function createSymbolView(container, width, height) {

	var view = new JenScript.View({
		name : container,
		width : width,
		height : height,
		
		west : 80,
		south:60
	});
	
	var proj = new JenScript.LinearProjection({
		name : "proj",
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
	
	var metrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisWest,
		minor : {
			tickMarkerSize : 2,
			tickMarkerColor : JenScript.RosePalette.AEGEANBLUE,
			tickMarkerStroke : 1
		},
		median : {
			tickMarkerSize : 4,
			tickMarkerColor : JenScript.RosePalette.EMERALD,
			tickMarkerStroke : 1.2,
			tickTextColor : JenScript.RosePalette.EMERALD,
			tickTextFontSize : 10
		},
		major : {
			tickMarkerSize : 8,
			tickMarkerColor : JenScript.RosePalette.TURQUOISE,
			tickMarkerStroke : 3,
			tickTextColor : JenScript.RosePalette.TURQUOISE,
			tickTextFontSize : 12
		}
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
			themeColor : JenScript.RosePalette.MANDARIN,
			opacity : 1,
			barFill : new JenScript.SymbolBarFill0({}),
			barEffect  : new JenScript.SymbolBarEffect0({}),
		});
		
		
		
		var  s1 = new JenScript.SymbolStack({
			name : 'stack1',
			themeColor : JenScript.RosePalette.CALYPSOBLUE,
			stackValue : stackValue()
		});
		var  s2 = new JenScript.SymbolStack({
			name : 'stack2',
			themeColor : JenScript.RosePalette.NEPTUNE,
			stackValue : stackValue()
		});
		var  s3 = new JenScript.SymbolStack({
			name : 'stack3',
			themeColor : JenScript.RosePalette.AEGEANBLUE,
			stackValue : stackValue()
		});
		
		symbol.addStack(s1);
		symbol.addStack(s2);
		symbol.addStack(s3);
		
		return symbol;
	}
	
	var createPoint = function(val){
		return new JenScript.SymbolPoint({
			value: val,
			themeColor : 'black',
		});
	}
	
	var polyline = new JenScript.SymbolPolylinePoint({
		themeColor : 'rgb(53, 121, 170)',
	});
	
	
	
	//layer
	var barLayer = new JenScript.SymbolBarLayer();
	symbolPlugin.addLayer(barLayer);
	
	var pointlayer = new JenScript.SymbolPointLayer();
	symbolPlugin.addLayer(pointlayer);
	
	//lay out
	barLayer.addSymbol(JenScript.SymbolFiller.createGlue()); //glue stretch
	pointlayer.addSymbol(JenScript.SymbolFiller.createGlue()); //glue stretch
	for (var i = 1; i <= 10; i++) {
		var value = barValue();
		
		var bar   = createBar(value);
		var point = createPoint(value);
		
		//lay bar
		barLayer.addSymbol(bar);
		if(i < 10)
			barLayer.addSymbol(JenScript.SymbolFiller.createStrut(20)); //glue rigid except after last bar
		
		//lay point
		pointlayer.addSymbol(JenScript.SymbolFiller.createStrut(16));//compensate for bar thickness (half)
		pointlayer.addSymbol(point);
		pointlayer.addSymbol(JenScript.SymbolFiller.createStrut(16));//compensate for bar thickness (half)
		if(i < 10)
			pointlayer.addSymbol(JenScript.SymbolFiller.createStrut(20)); //glue rigid except after last bar
		
		//polyline
		polyline.addSymbol(point);
	}
	barLayer.addSymbol(JenScript.SymbolFiller.createGlue());//glue stretch
	pointlayer.addSymbol(JenScript.SymbolFiller.createGlue());//glue stretch
	
	pointlayer.addSymbol(polyline); //does not contribute to filling
	
}
