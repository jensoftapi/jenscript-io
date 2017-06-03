(function(){
	JenScript.CandleStickCanvasGeometry = function(config) {
		this.__init(config);
	};
	JenScript.Model.inheritPrototype(JenScript.CandleStickCanvasGeometry, JenScript.StockItemGeometry);

	JenScript.Model.addMethods(JenScript.CandleStickCanvasGeometry, {
		__init : function(config){
			config = config || {};
			this.lowHighColor = 'darkgray';

			/**line low/high shape*/
			this.deviceLowHighGap;
			
			/**rectangle open/close shape*/
			this.deviceOpenCloseGap;
			this.bound;
		},
		
		solveItemGeometry : function(){
			//console.log('CandleStickGeometry.solveItemGeometry');
			var deviceLow = this.deviceLow;
			var deviceHigh = this.deviceHigh;
			var deviceOpen = this.deviceOpen;
			var deviceClose = this.deviceClose;
			var deviceFixingStart = this.deviceFixingStart;
			var deviceFixingDuration = this.deviceFixingDuration;
			
			this.deviceLowHighGap = new JenScript.SVGLine().from(deviceLow.x,deviceLow.y).to(deviceHigh.x,deviceHigh.y);
			if (this.getStock().getOpen() > this.getStock().getClose()) {
				this.deviceOpenCloseGap = new JenScript.SVGRect().origin(deviceFixingStart, deviceOpen.y).size(deviceFixingDuration, Math.abs(deviceOpen.y - deviceClose.y));
			} else {
				this.deviceOpenCloseGap = new JenScript.SVGRect().origin(deviceFixingStart, deviceClose.y).size(deviceFixingDuration, Math.abs(deviceOpen.y - deviceClose.y));
			}
		},
		
		getBound2D : function(){
			return this.deviceOpenCloseGap.getBound2D();
		}
		
	});
	
	JenScript.CandleStickCanvasLayer = function(config) {
		this._init(config);
	};
	JenScript.Model.inheritPrototype(JenScript.CandleStickCanvasLayer, JenScript.StockLayer);
	JenScript.Model.addMethods(JenScript.CandleStickCanvasLayer, {
		_init : function(config){
			config = config || {};
			this.lowHighColor = (config.lowHighColor !== undefined)?config.lowHighColor:'black';
			JenScript.StockLayer.call(this,{ name : "CandleStickCanvasLayer"});
		},
		
		setLowHighColor : function(color){
			this.color=color;
		},
		
		getLowHighColor : function(){
			return this.color;
		},
		
		
		solveLayer : function() {
			this.geometries = [];
			for (var i = 0; i < this.plugin.getBoundedStocks().length; i++) {
				var stock = this.plugin.getBoundedStocks()[i];
				var geom = new JenScript.CandleStickCanvasGeometry();
				geom.setLayer(this);
				geom.setStock(stock);
				geom.solveGeometry();
				this.addGeometry(geom);
			}
		},
		
	    onRelease : function(evt,part,x, y) {
	    	this.stockCheck('release',evt,x,y);
	    },
	   
	    onPress : function(evt,part,x, y) {
	    	this.stockCheck('press',evt,x,y);
	    },
	   
	    onMove : function(evt,part,x, y) {
	    	this.stockCheck('move',evt,x,y);
	    },
	    
	    /**
	     * check symbol event
	     * 
	     * @param {String}  action the action press, release, move, etc.
	     * @param {Object}  original event
	     * @param {Number}  x location
	     * @param {Number}  y location
	     */
	    stockCheck: function(action, evt,x,y){
	    	var that=this;
	    	var _d = function(geom){
	    	   if(action === 'press')
	    		   that.fireStockEvent('press',{stock : geom.getStock(), x:x,y:y, device :{x:x,y:y}});
               else if(action === 'release')
            	   that.fireStockEvent('release',{stock : geom.getStock(), x:x,y:y, device :{x:x,y:y}});
               else 
            	   that.stockEnterExitTracker(geom,x,y);
	    	};
	    	var _c = function(geom){
	    		var contains = (geom.getBound2D() !== undefined  && geom.getBound2D().contains(x,y));
        		if(action !== 'move' && contains && geom.getStock().isLockEnter()){
        			_d(geom);
        		}
        		else if (action === 'move') {
                	_d(geom);
                }
	    	};
	        for (var i = 0; i < this.geometries.length; i++) {
	        	_c(this.geometries[i]);
	        }
	    },

	    /**
	     * track stock enter or exit for the given stock and device location x,y
	     * 
	     * @param {Object}  stock symbol
	     * @param {Number}  x location in device coordinate
	     * @param {Number}  y location in device coordinate
	     */
	    stockEnterExitTracker : function(geom,x,y) {
	        if (geom.getBound2D() === undefined) {
	            return;
	        }
	        if (geom.getBound2D().contains(x, y) && !geom.getStock().isLockEnter()) {
	        	geom.getStock().setLockEnter(true);
	            this.fireStockEvent('enter',{stock : geom.getStock(), x:x,y:y, device :{x:x,y:y}});
	        }
	        if (geom.getBound2D().contains(x, y) && geom.getStock().isLockEnter()) {
	            this.fireStockEvent('move',{stock : geom.getStock(), x:x,y:y, device :{x:x,y:y}});
	        }
	        else if (!geom.getBound2D().contains(x, y) && geom.getStock().isLockEnter()) {
	        	geom.getStock().setLockEnter(false);
	            this.fireStockEvent('exit',{stock : geom.getStock(), x:x,y:y, device :{x:x,y:y}});
	        }
	    },

		paintLayer : function(g2d,part) {
			if (part === 'Device') {
				g2d.deleteGraphicsElement(this.Id);
				var canvasRoot = new JenScript.SVGGroup().Id(this.Id).toSVG();
				g2d.insertSVG(canvasRoot);
				
				var ratio   = window.devicePixelRatio || 1;
				console.log("ratio "+ratio)
				
				var fo = new JenScript.SVGElement()
							.name('foreignObject')
							.attr('width',this.getHost().getDevice().getWidth()+'px')
							.attr('height',this.getHost().getDevice().getHeight()+'px')
							.attr("x",this.getHost().getWest())
							.attr("y",this.getHost().getNorth())
							.buildHTML();
				
				canvasRoot.appendChild(fo);
				
				var w = this.getHost().getDevice().getWidth();
				var h = this.getHost().getDevice().getHeight();
				
				var canvas = document.createElement("canvas");
				canvas.setAttribute("width",ratio*w);
				canvas.setAttribute("height",ratio*h);
				canvas.setAttribute("x",this.getHost().getWest());
				canvas.setAttribute("y",this.getHost().getNorth());
				canvas.setAttribute("style","pointer-events: none;"+"width : "+w+"px;"+"height : "+h+"px;"); //else event are dropped?
				
				fo.appendChild(canvas);
				
				var ctx = canvas.getContext("2d");
				ctx.scale(ratio, ratio);
					
				for (var i = 0; i < this.getGeometries().length; i++) {
					var geom = this.getGeometries()[i];

					ctx.beginPath();
					ctx.moveTo(geom.deviceLow.x,geom.deviceLow.y);
					ctx.lineTo(geom.deviceHigh.x,geom.deviceHigh.y);
					ctx.lineWidth = 1;
					ctx.strokeStyle = 'black';
					ctx.stroke();
					
					ctx.fillStyle = (geom.getStock().isBearish())? this.plugin.getBearishColor():this.plugin.getBullishColor();
					if (geom.getStock().isBearish()) {
						ctx.fillRect(geom.deviceFixingStart, geom.deviceOpen.y,geom.deviceFixingDuration, Math.abs(geom.deviceOpen.y - geom.deviceClose.y));
					} else {
						ctx.fillRect(geom.deviceFixingStart, geom.deviceClose.y,geom.deviceFixingDuration, Math.abs(geom.deviceOpen.y - geom.deviceClose.y));
					}
				}
				
			}
		},
	});
})();