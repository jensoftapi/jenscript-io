var StockLoader = function(proj,args,callback){
	 //console.log('new StockLoader');
	 var years = [];
	 var stocks = [];
	 var that = this;
	 
	 
	 var monitorPlugin = new JenScript.ProgressPlugin({
			x : 30,
			y : 20,
			width : 100,
			height : 6,
//			outlineColor : 'black',
//			backgroundColor : 'pink',
//			foregroundColor : 'purple'
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
		//console.log('load year : '+year.year);
		if(year === undefined || year.year === undefined)
			return;
		
		var m = new JenScript.ProgressMonitor({
			//x : 30,
			//y : 20,
			//width : 100,
			//height : 6,
			total : 250,//approximation of total which is (245/255 stock by year)
			onComplete : function() {
				proj.unregisterPlugin(this);
			},
			outlineColor : 'black',
			backgroundColor : 'white',
			foregroundColor : JenScript.RosePalette.MANDARIN
		});
		monitorPlugin.addMonitor(m);
		
		//Ref to monitor
		year.monitor = m;
		
		var stockCount = 0;
		var dataWorker = new Worker('../StockWorker.js');
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
					}else{
						//console.log("no monitor found");
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
		console.log(i+','+y.year);
		setTimeout(function(){
			that.loadYear(y);
		},i*600);
	};
	
	for (var i = 0; i < args.length; i++) {
		//console.log('launch defaut year : '+args[i]);
		years[i]={year:args[i],state:'processing'};
		init(i,years[i]);
	}
	
};