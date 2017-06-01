this.onmessage = function(event) {
	var asset = event.data;
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
 	postMessage(data);
}

function transferFailed(evt) {
	console.log('transfer fail');
}

function transferCanceled(evt) {
	console.log('transfer cancel');
}




