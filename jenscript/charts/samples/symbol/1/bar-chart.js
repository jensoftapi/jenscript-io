
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
		paintMode : 'ACTIVE',
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
	
	
	
	//symbol factory
	var createBar = function(val){
		var symbol = new JenScript.SymbolBar({
			base : 0,
			value: val,
			thickness : 32,
			direction : 'ascent',
			morpheStyle : 'Round',
			themeColor : JenScript.RosePalette.MANDARIN,
			opacity : 1,
			barFill : new JenScript.SymbolBarFill1({}),
			barEffect  : new JenScript.SymbolBarEffect0({}),
		});
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
	
	//listener
	barLayer.addSymbolListener('enter',function(event){
		//event is something like, refer to source
		//event : {symbol : bar, x:x,y:y, device :{x:x,y:y}}
		
		console.log('symbol enter');
	},'this demo');
	
	//listener
	barLayer.addSymbolListener('exit',function(event){
		//event is something like, refer to source
		//event : {symbol : bar, x:x,y:y, device :{x:x,y:y}}
		
		console.log('symbol exit');
	},'this demo');
	
	//listener
	barLayer.addSymbolListener('move',function(event){
		//event is something like, refer to source
		//event : {symbol : bar, x:x,y:y, device :{x:x,y:y}}
		
		console.log('symbol move');
	},'this demo');
	
	//listener
	barLayer.addSymbolListener('press',function(event){
		//event is something like, refer to source
		//event : {symbol : bar, x:x,y:y, device :{x:x,y:y}}
		
		console.log('symbol press');
	},'this demo');
	
	//listener
	barLayer.addSymbolListener('release',function(event){
		//event is something like, refer to source
		//event : {symbol : bar, x:x,y:y, device :{x:x,y:y}}
		
		console.log('symbol release');
	},'this demo');
}
