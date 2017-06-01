
/**
 * createSymbolBarView
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
			tickMarkerColor : 'cyan',
			tickMarkerStroke : 1
		};
		var median = {
			tickMarkerSize : 4,
			tickMarkerColor : 'cyan',
			tickMarkerStroke : 1.2,
			tickTextColor : 'cyan',
			tickTextFontSize : 10
		};
		var major = {
			tickMarkerSize : 8,
			tickMarkerColor : '#3498db',
			tickMarkerStroke : 3,
			tickTextColor : '#3498db',
			tickTextFontSize : 12
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
	
	var symbolPlugin = new JenScript.SymbolPlugin({
		nature : 'Vertical'
	});
	proj.registerPlugin(symbolPlugin);
	
	var random = function getRandomArbitrary(min, max) {
	  return Math.random() * (max - min) + min;
	}
	
	barValue = function (){
		return random(200,800);
	}
	
	stackValue = function (){
		return random(20,60);
	}
	
	var count = 1;
	
	var createBar = function(val){
		var symbol = new JenScript.SymbolBarStacked({
			name : 'Symbol'+count,
			base : 0,
			value: val,
			thickness : 32,
			direction : 'ascent',
			morpheStyle : 'Round',
			themeColor : '#c0392b',
			opacity : 0.6,
			barStroke : new JenScript.SymbolBarStroke({strokeColor : 'white', strokeWidth :0.5}),
			barFill : new JenScript.SymbolBarFill0({}),
			barEffect  : new JenScript.SymbolBarEffect0({}),
		});
		
		var axisLabel = new JenScript.SymbolAxisLabel({
			part : 'South', 
			text : symbol.name,
			textColor : 'turquoise',
			textAnchor : 'end',
			paintType : 'None',
			rotateAngle : -45,
			ty : 20
		});
		symbol.setAxisLabel(axisLabel);
		count++;
		
		var  s1 = new JenScript.SymbolStack({
			name : 'stack1',
			opacity : 0.6,
			themeColor : 'rgb(91, 151, 168)',
			stackValue : stackValue()
		});
		var  s2 = new JenScript.SymbolStack({
			name : 'stack2',
			opacity : 0.6,
			themeColor : 'rgb(128, 182, 191)',
			stackValue : stackValue()
		});
		var  s3 = new JenScript.SymbolStack({
			name : 'stack3',
			opacity : 0.6,
			themeColor : 'rgb(22, 125, 218)',
			stackValue : stackValue()
		});
		
		symbol.addStack(s1);
		symbol.addStack(s2);
		symbol.addStack(s3);
		
		return symbol;
	}
	
	var barLayer = new JenScript.SymbolBarLayer();
	symbolPlugin.addLayer(barLayer);
	
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
	
	var t1 = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'Label 1',
		fontSize : 14,
		textColor : 'rgb(91, 151, 168)',
		xAlign : 'right',
		yAlign : 'top',
	});
	proj.registerPlugin(t1);
	
	var t2 = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'Label 2',
		fontSize : 14,
		textColor : 'rgb(128, 182, 191)',
		xAlign : 'right',
		yAlign : 'top',
		yMargin : 20
	});
	proj.registerPlugin(t2);
	
	var t3 = new JenScript.TitleLegendPlugin({
		layout : 'relative',
		part   : JenScript.ViewPart.Device,
		text   : 'Label 3',
		fontSize : 14,
		textColor : 'rgb(22, 125, 218)',
		xAlign : 'right',
		yAlign : 'top',
		yMargin : 36
	});
	proj.registerPlugin(t3);
	
	var tx1 = new JenScript.TranslatePlugin({
		mode : 'ty',
		slaves :[{plugin : symbolPlugin, direction: 'y'},
		         {plugin : gridPlugin, direction: 'y'},
		         {plugin : metrics, direction: 'y'}]
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
	 
}