
/**
 * createSymbolView
 * 
 * @param container
 * @param width
 * @param height
 */
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
			tickMarkerColor : 'cyan',
			tickMarkerStroke : 1
		};
		var median = {
			tickMarkerSize : 4,
			tickMarkerColor : 'yellow',
			tickMarkerStroke : 1.2,
			tickTextColor : 'yellow',
			tickTextFontSize : 10
		};
		var major = {
			tickMarkerSize : 8,
			tickMarkerColor : 'rgb(240,88,0)',
			tickMarkerStroke : 3,
			tickTextColor : 'rgb(240,88,0)',
			tickTextFontSize : 12,
			tickTextOffset : 16
		};
		
	var metrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisWest,
		minor : minor,
		median : median,
		major : major
	});
	proj.registerPlugin(metrics);
	
	var gridPlugin = new JenScript.GridModeledPlugin({
		gridOrientation : 'Horizontal',
		gridColor : 'white',
		gridWidth : 0.5,
		gridOpacity : 0.5
	});
	proj.registerPlugin(gridPlugin);
	
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
			themeColor : '#d35400',
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
	
	var createPoint = function(val){
		return new JenScript.SymbolPoint({
			value: val,
			themeColor : 'yellow',
		});
	}
	
	var polyline = new JenScript.SymbolPolylinePoint({
		themeColor : 'rgb(255, 88, 0)',
	});
	
	
	
	//layer
	var barLayer = new JenScript.SymbolBarLayer();
	symbolPlugin.addLayer(barLayer);
	
	var pointlayer = new JenScript.SymbolPointLayer();
	symbolPlugin.addLayer(pointlayer);
	
	//lay out
	barLayer.addSymbol(JenScript.SymbolFiller.createGlue(),false); //glue stretch
	pointlayer.addSymbol(JenScript.SymbolFiller.createGlue(),false); //glue stretch
	for (var i = 1; i <= 10; i++) {
		var value = barValue();
		
		var bar   = createBar(value);
		var point = createPoint(value);
		
		//lay bar
		barLayer.addSymbol(bar,false);
		if(i < 10)
			barLayer.addSymbol(JenScript.SymbolFiller.createStrut(20),false); //glue rigid except after last bar
		
		//lay point
		pointlayer.addSymbol(JenScript.SymbolFiller.createStrut(16),false);//compensate for bar thickness (half)
		pointlayer.addSymbol(point,false);
		pointlayer.addSymbol(JenScript.SymbolFiller.createStrut(16),false);//compensate for bar thickness (half)
		if(i < 10)
			pointlayer.addSymbol(JenScript.SymbolFiller.createStrut(20),false); //glue rigid except after last bar
		
		//polyline
		polyline.addSymbol(point);
	}
	barLayer.addSymbol(JenScript.SymbolFiller.createGlue(),false);//glue stretch
	pointlayer.addSymbol(JenScript.SymbolFiller.createGlue(),false);//glue stretch
	
	pointlayer.addSymbol(polyline); //does not contribute to filling
	
	//invoke repaint only one time
	symbolPlugin.repaintPlugin();
}
