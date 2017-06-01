
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
		south:80
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
	
	
	
	var symbolPlugin = new JenScript.SymbolPlugin({
		nature : 'Vertical',
	});
	proj.registerPlugin(symbolPlugin);
	
	var count = 1;
	
	//symbol factory
	var createBar = function(val){
		var symbol = new JenScript.SymbolBar({
			name : 'Symbol'+count,
			base : 0,
			value: val,
			thickness : 32,
			direction : 'ascent',
			morpheStyle : 'Round',
			themeColor : '#d35400',
			opacity : 0.8,
			barStroke : new JenScript.SymbolBarStroke({strokeColor : 'white', strokeWidth :0.5}),
			barFill : new JenScript.SymbolBarFill1({}),
			barEffect  : new JenScript.SymbolBarEffect0({}),
		});
		
		
		var axisLabel = new JenScript.SymbolAxisLabel({
			part : 'South', //North or South for horizontal symbol
			text : symbol.name,
			textColor : 'orange',
			textAnchor : 'end',
			fillColor : 'rgba(250,250,250,0.3)',
			paintType : 'Both',
			rotateAngle : -45,
			ty : 20
		});
		symbol.setAxisLabel(axisLabel);
		count++;
		return symbol;
		
	}
	
	//layer
	var barLayer = new JenScript.SymbolBarLayer();
	symbolPlugin.addLayer(barLayer);
	
	// arbitrary values between min max values
	var random = function getRandomArbitrary(min, max) {
	  return Math.random() * (max - min) + min;
	}
	
	barValue = function (){
		return random(200,800);
	}
	
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
	
	//TOOL
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
