var DataLoader = function(proj,bundle,callback){
	
	var recordCounter = 0;
	var dataPaths = [];
	 
	 var monitorPlugin = new JenScript.ProgressPlugin({
			x : 30,
			y : 20,
			width : 200,
			height : 6,
	 });
	 proj.registerPlugin(monitorPlugin);
	 
	 var total = 0;
	 if(bundle === 'data-lines')
		 total = 86;
	 if(bundle === 'data-cloud1')
		 total = 37;
	 if(bundle === 'data-cloud2')
		 total = 93;	
	 
	var m = new JenScript.ProgressMonitor({
			total : total,
			onComplete : function() {
				//console.log('complete callback');
			},
			outlineColor : 'black',
			backgroundColor : '#1abc9c',
			backgroundOpacity : 1,
			foregroundColor : '#e67e22',
			foregroundOpacity : 1,
			textColor : '#2ecc71'
	});
	monitorPlugin.addMonitor(m);
	 
	var createRecord = function(record) {
		if (record === undefined)
			return;
		recordCounter++;
		m.setValue(recordCounter, 'Load data record ' + recordCounter);
		return {
			rank : recordCounter,
			record : record,
		};
	};

	var load = function(){
		var dataWorker = new Worker('/jenscript/charts/samples/realtime/DataWorker.js');
		dataWorker.addEventListener("message", function(event) {
			if (event.data === 'start') {
				dataPaths = [];
			} else if (event.data === 'finish') {
				callback(dataPaths);
			} else {
				var dp = createRecord(event.data);
				if (dp.record.length > 0)
					dataPaths[dataPaths.length] = dp;
			}

		}, false);
		dataWorker.postMessage('start:'+bundle);
	};
	load();
};