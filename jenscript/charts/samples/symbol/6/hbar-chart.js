
/**
 * createSymbolBarView
 * 
 * @param container
 * @param width
 * @param height
 */
function createHSymbolBarView(container, width, height) {

	var view = new JenScript.View({
		name : container,
		width : width,
		height : height,
		east : 80,
		west : 80,
		south: 80,
		north : 80
	});
	
	var proj = new JenScript.LinearProjection({
		name : "proj",
		paintMode : 'ACTIVE',
		minX : -100,
		maxX : 1200,
		minY : 0,
		maxY : 0
	});
	view.registerProjection(proj);

	var outline = new JenScript.DeviceOutlinePlugin({
		color : 'pink'
	});

	proj.registerPlugin(outline);
	
	var metrics = new JenScript.AxisMetricsModeled({
		axis : JenScript.Axis.AxisSouth,
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
		gridOrientation : 'Vertical',
		gridColor : 'white',
		gridWidth : 0.5,
		gridOpacity : 0.5
	});
	proj.registerPlugin(gridPlugin);
	
	//TOOL
	var tx1 = new JenScript.TranslatePlugin({
		mode : 'tx',
	});
	proj.registerPlugin(tx1);
	tx1.registerWidget(new JenScript.TranslateCompassWidget({
		ringFillColor : 'pink'
	}));
	tx1.select();
	
	var zoomwheel = new JenScript.ZoomWheelPlugin({
		mode : 'wheelX'
	});
	proj.registerPlugin(zoomwheel);
	
	var symbolPlugin = new JenScript.SymbolPlugin({
		nature : 'Horizontal'
	});
	proj.registerPlugin(symbolPlugin);
	
	// arbitrary values between min max values
	var random = function getRandomArbitrary(min, max) {
	  return Math.random() * (max - min) + min;
	}
	
	baseValue = function (){
		return random(0,60);
	}
	
	barValue = function (){
		return random(200,800);
	}
	
	stackValue = function (){
		return random(20,60);
	}
	
	var count = 1;
	//symbol factory
	var createBar = function(val){
		var symbol = new JenScript.SymbolBarStacked({
			name : 'symbol'+count,
			base : baseValue(),
			value: barValue(),
			thickness : 18,
			direction : 'ascent',
			morpheStyle : 'Round',
			themeColor : JenScript.RosePalette.MANDARIN,
			opacity : 1,
			barFill : new JenScript.SymbolBarFill0({}),
			barEffect  : new JenScript.SymbolBarEffect0({}),
		});
		
		var axisLabel = new JenScript.SymbolAxisLabel({
			part : 'West', //East or West for horizontal symbol
			text : symbol.name,
			textColor : 'black',
			textAnchor : 'end',
			paintType : 'None',
			rotateAngle : -25,
		});
		
		symbol.setAxisLabel(axisLabel);
		
//		var barLabel = new JenScript.SymbolBarLabel({
//			text : symbol.name,
//			textColor : 'black',
//			textAnchor : 'end',
//			barAnchor : 'middle',
//			paintType : 'None',
//			rotateAngle : 0,
//		});
//		symbol.setBarLabel(barLabel);
		
		var  s1 = new JenScript.SymbolStack({
			name : 'symbol'+count+' stack1',
			themeColor : JenScript.RosePalette.CALYPSOBLUE,
			stackValue : stackValue()
		});
		var  s2 = new JenScript.SymbolStack({
			name : 'symbol'+count+' stack2',
			themeColor : JenScript.RosePalette.NEPTUNE,
			stackValue : stackValue()
		});
		var  s3 = new JenScript.SymbolStack({
			name : 'symbol'+count+ 'stack3',
			themeColor : JenScript.RosePalette.AEGEANBLUE,
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
	barLayer.addSymbol(JenScript.SymbolFiller.createStrut(10),false); //glue rigid 10px
	barLayer.addSymbol(JenScript.SymbolFiller.createGlue(),false); //glue stretch
	for (var i = 1; i <= 10; i++) {
		var bar = createBar();
		barLayer.addSymbol(bar,false);
		
		if(i < 10)
		barLayer.addSymbol(JenScript.SymbolFiller.createStrut(10),false); //glue rigid except after last bar
	}
	barLayer.addSymbol(JenScript.SymbolFiller.createGlue(),false);//glue stretch
	
	//invoke repaint only one time
	symbolPlugin.repaintPlugin();
	
}
