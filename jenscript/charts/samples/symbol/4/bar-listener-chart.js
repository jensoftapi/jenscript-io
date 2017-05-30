
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
			themeColor : '#d35400',
			opacity : 1,
			barFill : new JenScript.SymbolBarFill1({}),
			barEffect  : new JenScript.SymbolBarEffect0({}),
		});
		return symbol;
	}
	
	var barLayer = new JenScript.SymbolBarLayer();
	symbolPlugin.addLayer(barLayer);
	
	// randomized value between min max values
	var random = function getRandomArbitrary(min, max) {
	  return Math.random() * (max - min) + min;
	}
	
	barValue = function (){
		return random(200,1000);
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
	
	var labelPlugin = new JenScript.TextLabelPlugin();
	proj.registerPlugin(labelPlugin);
	
	var label = new JenScript.TextLabel({
		fillColor : 'black',
		outlineColor : 'rgb(244, 145, 26)',
		cornerRadius : 10,
		outlineWidth : 2,
		textColor : 'rgb(244, 145, 26)',
		fontSize : 16
	});
	labelPlugin.addLabel(label);

	var updateText = function(action, event) {
		label.setText(action);
		label.setX(event.device.x);
		label.setY(event.device.y);
		labelPlugin.repaintPlugin();
	};
	
	var lock = false;
	barLayer.addSymbolListener('enter',function(event){
		updateText('enter',event);
		lock = true;
		setTimeout(function(){lock=false;},200);
	},'this demo');
	
	barLayer.addSymbolListener('exit',function(event){
		updateText('exit',event);
		setTimeout(function(){updateText(undefined,event);},200);
	},'this demo');
	
	barLayer.addSymbolListener('move',function(event){
		if(!lock)
		updateText('move',event);
	},'this demo');
	
	barLayer.addSymbolListener('press',function(event){
		updateText('press',event);
	},'this demo');
	
	barLayer.addSymbolListener('release',function(event){
		updateText('release',event);
	},'this demo');
}
