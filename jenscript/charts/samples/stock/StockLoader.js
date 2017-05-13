var StockLoader = function(proj,args,callback,config){
	 var years = [];
	 var stocks = [];
	 var that = this;
	 config = config ||{};
	
	 //var backgroundColor = (config.backgroundColor !== undefined)?config.backgroundColor : 'white';
	 var foregroundColor = (config.foregroundColor !== undefined)?config.foregroundColor : JenScript.RosePalette.MANDARIN;
	 var outlineColor = (config.outlineColor !== undefined)?config.outlineColor : 'black';
	 
	 var backgroundOpacity = (config.backgroundOpacity !== undefined)?config.backgroundOpacity : 0.3;
	 var foregroundOpacity = (config.foregroundOpacity !== undefined)?config.foregroundOpacity : 0.7;
	 
	 var monitorPlugin = new JenScript.ProgressPlugin({
			x : 30,
			y : 20,
			width : 100,
			height : 6,
	 });
	 proj.registerPlugin(monitorPlugin);
	 
	 
	 this.getY = function(fullYear){
		 for (var i = 0; i < years.length; i++) {
				var y = years[i];
				if(fullYear == y.year)
					return y;
		 }
		 return undefined;
	 },
	 
	 this.loadYear = function(year){
		if(year === undefined || year.year === undefined)
			return;
		
		var m = new JenScript.ProgressMonitor({
			total : 250,//approximation of total which is (245/255 stock by year)
			onComplete : function() {
				proj.unregisterPlugin(this);
			},
			outlineColor : outlineColor,
			//backgroundColor : 'white',
			backgroundOpacity : backgroundOpacity,
			foregroundOpacity : foregroundOpacity,
			foregroundColor : foregroundColor
		});
		monitorPlugin.addMonitor(m);
		
		//Ref to monitor
		year.monitor = m;
		
		var stockCount = 0;
		var dataWorker = new Worker('/jenscript/charts/samples/stock/StockWorker.js');
		dataWorker.addEventListener("message", function(event) {
			if (event.data.startsWith !== undefined && event.data.startsWith('finish')) {
				var yearFromWorker = event.data.split(':')[1];
				var yo = that.getY(yearFromWorker);
				yo.state='loaded';
				yo.monitor.complete();
				callback(yo.year,stocks);
				yo.worker.terminate();
			} else {
				stockCount++;
				var stock = new JenScript.Stock(event.data);
				if (event.data.fixing !== undefined){
					stocks[stocks.length] = stock;
					var yo = that.getY(stock.fixing.getFullYear());
					if(yo.monitor){
						setTimeout(function(){
							yo.monitor.setValue(stockCount, 'Load SLV '+yo.year+' stock '+ stockCount);
						},20);
					}
					
				}
				
			}

		}, false);
		dataWorker.postMessage((year.year+''));
		year.worker=dataWorker;
	};

	proj.addProjectionListener('boundChanged',function(){
		var minYear = proj.getMinDate().getFullYear();
		var maxYear = proj.getMaxDate().getFullYear();
		var foundMinYear = false;
		var foundMaxYear = false;
		for (var i = 0; i < years.length; i++) {
			var y = years[i].year;
			if(y === minYear){
				foundMinYear = true;
			}
			if(y === maxYear){
				foundMaxYear = true;
			}
		}
		if(!foundMinYear){
			years[years.length]={year : minYear , state :'request'};
		}
		if(!foundMaxYear && minYear !== maxYear){
			years[years.length]={year : maxYear , state :'request'};
		}
		for (var i = 0; i < years.length; i++) {
			var y = years[i];
			if(y.state === 'request'){
				y.state = 'processing';
				setTimeout(that.loadYear(y),300);
			}
		}
		
	},'Stock projection listener');
	
	var init = function(i,y){
		//console.log(i+','+y.year);
		setTimeout(function(){
			that.loadYear(y);
		},i*600);
	};
	
	for (var i = 0; i < args.length; i++) {
		years[i]={year:args[i],state:'processing'};
		init(i,years[i]);
	}
	
};