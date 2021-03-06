
/**
 * createSymbolBarView
 * 
 * @param container
 * @param width
 * @param height
 */
function createVSymbolBarView(container, width, height) {

	var view = new JenScript.View({
		name : container,
		width : width,
		height : height,
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
	
	
	
	stackValue = function (){
		return random(20,60);
	}
	
	var count = 1;
	
	//symbol factory
	var createBar = function(min, max){
		var symbol = new JenScript.SymbolBarStacked({
			name : 'symbol'+count,
			base : min,
			value: max,
			thickness : 32,
			direction : 'ascent',
			morpheStyle : 'Round',
			themeColor : '#e67e22',
			opacity : 1,
			barFill : new JenScript.SymbolBarFill0({}),
			barEffect  : new JenScript.SymbolBarEffect0({}),
		});
		
		
		var  s1 = new JenScript.SymbolStack({
			name : 'symbol'+count+ 'stack1',
			themeColor : 'rgb(91, 151, 168)',
			stackValue : stackValue()
		});
		var  s2 = new JenScript.SymbolStack({
			name : 'symbol'+count+ 'stack2',
			themeColor : 'rgb(128, 182, 191)',
			stackValue : stackValue()
		});
		var  s3 = new JenScript.SymbolStack({
			name : 'symbol'+count+ 'stack3',
			themeColor : 'rgb(22, 125, 218)',
			stackValue : stackValue()
		});
		
		symbol.addStack(s1);
		symbol.addStack(s2);
		symbol.addStack(s3);
		
		count++;
		
		return symbol;
	}
	
	//layer
	var barLayer = new JenScript.SymbolBarLayer();
	symbolPlugin.addLayer(barLayer);
	

	
	//lay out
	barLayer.addSymbol(JenScript.SymbolFiller.createGlue(),false); //glue stretch
	
	var bar = createBar(200,800);
	barLayer.addSymbol(bar,false);
	var barLabel = new JenScript.SymbolBarLabel({
		text : 'symbol1',
		textColor : 'black',
		textAnchor : 'middle', //start, middle, end
		barAnchor : 'bottom', //top, bottom, middle
		paintType : 'None',
		rotateAngle : 0,
		ty : 0,
	});
	bar.setBarLabel(barLabel);
	
	barLayer.addSymbol(JenScript.SymbolFiller.createStrut(40),false);
	
	var bar2 = createBar(200,800);
	barLayer.addSymbol(bar2,false);
	var barLabel2 = new JenScript.SymbolBarLabel({
		text : 'symbol2',
		textColor : 'black',
		textAnchor : 'middle', //start, middle, end
		barAnchor : 'top', //top, bottom, middle
		paintType : 'None',
		rotateAngle : 0,
		ty : 0,
	});
	bar2.setBarLabel(barLabel2);
	
	
	barLayer.addSymbol(JenScript.SymbolFiller.createStrut(40),false);
	
	var bar3 = createBar(200,800);
	barLayer.addSymbol(bar3,false);
	var barLabel3 = new JenScript.SymbolBarLabel({
		text : 'symbol3',
		textColor : 'black',
		textAnchor : 'middle', //start, middle, end
		barAnchor : 'middle', //top, bottom, middle
		paintType : 'None',
		rotateAngle : 0,
		ty : 0,
	});
	bar3.setBarLabel(barLabel3);
	
	barLayer.addSymbol(JenScript.SymbolFiller.createStrut(40),false);
	
	var bar4 = createBar(200,800);
	barLayer.addSymbol(bar4,false);
	var barLabel4 = new JenScript.SymbolBarLabel({
		text : 'symbol4',
		textColor : 'black',
		textAnchor : 'end', //start, middle, end
		barAnchor : 'top', //top, bottom, middle
		paintType : 'None',
		rotateAngle : -90,
		tx : -bar4.thickness/2,
		ty : 0,
	});
	bar4.setBarLabel(barLabel4);
	
	barLayer.addSymbol(JenScript.SymbolFiller.createStrut(40),false);
	
	var bar5 = createBar(200,800);
	barLayer.addSymbol(bar5,false);
	var barLabel5 = new JenScript.SymbolBarLabel({
		text : 'symbol5',
		textColor : 'black',
		textAnchor : 'start', //start, middle, end
		barAnchor : 'bottom', //top, bottom, middle
		paintType : 'None',
		rotateAngle : -90,
		tx : -bar5.thickness/2,
		ty : 0,
	});
	bar5.setBarLabel(barLabel5);
	
	barLayer.addSymbol(JenScript.SymbolFiller.createStrut(40),false);
	
	var bar6 = createBar(200,800);
	barLayer.addSymbol(bar6,false);
	var barLabel6 = new JenScript.SymbolBarLabel({
		text : 'symbol6',
		textColor : 'black',
		textAnchor : 'middle', //start, middle, end
		barAnchor : 'middle', //top, bottom, middle
		paintType : 'None',
		rotateAngle : -90,
		tx : bar6.thickness/2 + 12,
		ty : 0,
	});
	bar6.setBarLabel(barLabel6);
		
	barLayer.addSymbol(JenScript.SymbolFiller.createGlue(),false);//glue stretch
	
	//invoke repaint only one time
	symbolPlugin.repaintPlugin();
	
}
