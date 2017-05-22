(function(){
	
	/**
	 * Object SymbolAbstractLabel()
	 * Defines Symbol Abstract Label
	 * @param {Object} config
	 * @param {String} [config.name] the label type name
	 * @param {String} [config.text] the label text
	 * @param {String} [config.textColor] the label text color
	 * @param {Number} [config.fontSize] the label text font size
	 * @param {String} [config.textAnchor] the label text anchor
	 * @param {Object} [config.shader] the label fill shader
	 * @param {Object} [config.shader.percents] the label fill shader percents
	 * @param {Object} [config.shader.colors] the label fill shader colors
	 * @param {String} [config.paintType] the label paint type should be , Both, Stroke, Fill, None
	 * @param {String} [config.outlineColor] the label outline color
	 * @param {String} [config.cornerRadius] the label outline corner radius
	 * @param {String} [config.fillColor] the label fill color
	 */
	JenScript.SymbolAbstractLabel = function(config) {
		this._init(config);
	};
	JenScript.Model.inheritPrototype(JenScript.SymbolAbstractLabel,JenScript.AbstractLabel);
	JenScript.Model.addMethods(JenScript.SymbolAbstractLabel,{
		
		/**
		 * Initialize Abstract Symbol Label
		 * @param {Object} config
		 * @param {String} [config.name] the label type name
		 * @param {String} [config.text] the label text
		 * @param {String} [config.textColor] the label text color
		 * @param {Number} [config.fontSize] the label text font size
		 * @param {String} [config.textAnchor] the label text anchor
		 * @param {Object} [config.shader] the label fill shader
		 * @param {Object} [config.shader.percents] the label fill shader percents
		 * @param {Object} [config.shader.colors] the label fill shader colors
		 * @param {String} [config.paintType] the label paint type should be , Both, Stroke, Fill, None
		 * @param {String} [config.outlineColor] the label outline color
		 * @param {String} [config.cornerRadius] the label outline corner radius
		 * @param {String} [config.fillColor] the label fill color
		 */
		_init : function(config){
			JenScript.AbstractLabel.call(this,config);
		},
		
		/**
		 * Abstract label paint for Symbol
		 */
		paintSymbol : function(g2d,symbol,part){
			throw new Error('paintSymbolLabel method should be provide by override');
		}
		
	});
	
	
	/**
	 * Object SymbolDefaultLabel()
	 * Defines Donut Border Label, a label which is paint on the donut border left or right side 
	 * @param {Object} config
	 * @param {String} [config.name] the label type name
	 * @param {String} [config.text] the label text
	 * @param {String} [config.textColor] the label text color
	 * @param {Number} [config.fontSize] the label text font size
	 * @param {String} [config.textAnchor] the label text anchor
	 * @param {Object} [config.shader] the label fill shader
	 * @param {Object} [config.shader.percents] the label fill shader percents
	 * @param {Object} [config.shader.colors] the label fill shader colors
	 * @param {String} [config.paintType] the label paint type should be , Both, Stroke, Fill, None
	 * @param {String} [config.outlineColor] the label outline color
	 * @param {String} [config.cornerRadius] the label outline corner radius
	 * @param {String} [config.fillColor] the label fill color
	 * @param {String} [config.rotate] active rotate
	 * @param {String} [config.rotateAngle] the label rotation angle
	 * @param {String} [config.part] the label view part, east, west, south, east, device
	 * @param {String} [config.position] the label position, top, bottom, middle
	 */
	JenScript.SymbolDefaultLabel = function(config) {
		this.__init(config);
	};
	JenScript.Model.inheritPrototype(JenScript.SymbolDefaultLabel, JenScript.SymbolAbstractLabel);
	JenScript.Model.addMethods(JenScript.SymbolDefaultLabel, {
		
		/**
		 * Initialize Symbol Default Label
		 * @param {Object} config
		 * @param {String} [config.name] the label type name
		 * @param {String} [config.text] the label text
		 * @param {String} [config.textColor] the label text color
		 * @param {Number} [config.fontSize] the label text font size
		 * @param {String} [config.textAnchor] the label text anchor
		 * @param {Object} [config.shader] the label fill shader
		 * @param {Object} [config.shader.percents] the label fill shader percents
		 * @param {Object} [config.shader.colors] the label fill shader colors
		 * @param {String} [config.paintType] the label paint type should be , Both, Stroke, Fill, None
		 * @param {String} [config.outlineColor] the label outline color
		 * @param {String} [config.cornerRadius] the label outline corner radius
		 * @param {String} [config.fillColor] the label fill color
		 * @param {String} [config.rotate] active rotate
		 * @param {String} [config.rotateAngle] the label rotation angle
		 * @param {String} [config.part] the label view part, east, west, south, east, device
		 * 
		 */
		__init : function(config){
			config = config || {};
			config.name = 'JenScript.SymbolDefaultLabel';
			this.part = (config.part !== undefined)? config.part:'West';
			this.position = (config.position !== undefined)? config.position:'middle';
			JenScript.SymbolAbstractLabel.call(this, config);
		},
		
		/**
		 *Paint default label Symbol
		 */
		paintSymbol : function(g2d,symbol,part){
			if (symbol.getNature() === 'Vertical') {
				this.paintVLabel(g2d,symbol,part);
		    }
		    if (symbol.getNature() === 'Horizontal') {
		    	this.paintHLabel(g2d,symbol,part);
		    }
		},
		
		paintHLabel : function(g2d,symbol,part){
//			if (symbol instanceof JenScript.SymbolBar) {
//   	    		if (symbol instanceof JenScript.SymbolBarGroup) {
//                    //this.paintGroup(g2d,symbol,viewPart,paintRequest);
//                    console.log("paint group symbol label"+symbol.Id);
//                }
//                else if (symbol instanceof JenScript.SymbolBarStacked) {
//                    //this.paintBarStacked(g2d,symbol,viewPart, paintRequest);
//                	console.log("paint staked symbol label"+symbol.Id);
//                }
//                else {
//                    //this.paintBar(g2d,symbol,viewPart,paintRequest);
//                	console.log("paint bar symbol label"+symbol.Id);
//                }
//   	    	}
			
			if(this.part === 'West' && part === 'West'){
				console.log("part west"+part);
				var cy = symbol.getCenterY();
				var w = symbol.getHost().getWest();
				this.setTextAnchor("end");
		        this.setLocation(new JenScript.Point2D(w-5,cy));
				this.paintLabel(g2d);
			}
			if(this.part === 'East'  && part === 'East'){
				console.log("part "+part);
				var cy = symbol.getCenterY();
				this.setTextAnchor("start");
		        this.setLocation(new JenScript.Point2D(5,cy));
				this.paintLabel(g2d);
				console.log("label painted");
			}
			else if(this.part === 'Device' && part === 'Device'){
				var b = symbol.getBound2D();
				var cy = symbol.getCenterY();
				var margin = symbol.getHost().getWest();
				var m = symbol.getHost().getWest();
				this.setTextAnchor("middle");
		        this.setLocation(new JenScript.Point2D(b.getCenterX(),cy));
				this.paintLabel(g2d);
			}
			
			
		},
		
		paintVLabel : function(g2d,symbol,part){
			
			if(this.part === 'South' && part === 'South'){
				var cx = symbol.getCenterX();
				var w = symbol.getHost().getWest();
				this.setTextAnchor("end");
		        this.setLocation(new JenScript.Point2D(w+cx,5));
				this.paintLabel(g2d);
			}
			else if(this.part === 'North' && part === 'North'){
				var cx = symbol.getCenterX();
				var w = symbol.getHost().getWest();
				var n = symbol.getHost().getNorth();
				this.setTextAnchor("start");
		        this.setLocation(new JenScript.Point2D(w+cx,n-5));
				this.paintLabel(g2d);
			}
			else if(this.part === 'Device' && part === 'Device'){
				var b = symbol.getBound2D();
				var cx = symbol.getCenterX();
				var margin = symbol.getHost().getWest();
				var m = symbol.getHost().getWest();
				this.setTextAnchor("middle");
		        this.setLocation(new JenScript.Point2D(b.getCenterX(),b.getCenterY()));
				this.paintLabel(g2d);
				
				//var rect = new JenScript.SVGRect().origin(b.getCenterX(),b.getCenterY()).size(2,2).fill('red').toSVG();
				//g2d.insertSVG(rect);
			}

		},
		
		
		
		
		
		
	});
	
})();