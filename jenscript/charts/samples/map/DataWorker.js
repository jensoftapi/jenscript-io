	var asset;
	
	var geoJsonPlugin;

this.onmessage = function(event) {
	 asset = event.data.asset;
	
	// geoJsonPlugin = event.data.plugin;
	var oReq = new XMLHttpRequest();
	//oReq.overrideMimeType('text/plain');
	oReq.addEventListener("progress", updateProgress, false);
	oReq.addEventListener("load", transferComplete, false);
	oReq.addEventListener("error", transferFailed, false);
	oReq.addEventListener("abort", transferCanceled, false);
	oReq.open("get", "/jenscript/charts/samples/map/assets/"+asset, true);
	oReq.send();
};

function updateProgress (oEvent) {
  if (oEvent.lengthComputable) {
    var percentComplete = oEvent.loaded / oEvent.total;
  }
}

function transferComplete(evt) {
 	var data = evt.target.responseText;
 	
 	//solve shape here
 	//var geoJSON = JSON.parse(data);
 	//console.log(geoJSON);
	//plugin.addGeoJSON(geoJSON);
// 	for (var i = 0; i < geoJSON.features.length; i++) {
// 		postMessage(geoJSON.features[i]);
//	} 
 	postMessage(data);
 	
}

function transferFailed(evt) {
	console.log('transfer fail');
}

function transferCanceled(evt) {
	console.log('transfer cancel');
}




