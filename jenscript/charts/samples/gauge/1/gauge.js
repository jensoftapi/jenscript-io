

/**
 * Gauge Path Binder Animator
 * 
 * @param container
 * @param width
 * @param height
 */
function createView(container, width, height) {

	
	var view = new JenScript.View({
		name : container,
		width : width,
		height : height,
		holders : 20,
		
	});


	var proj = new JenScript.LinearProjection({
		name : "proj1",
		minX : -1000,
		maxX : 1000,
		minY : -1000,
		maxY : 1000
	});
	view.registerProjection(proj);

	var outline = new JenScript.DeviceOutlinePlugin({color : 'pink'});
	proj.registerPlugin(outline);

	

	var Test = {};
	Test.TestPathBinderArcManual = function(config) {
		this._init(config);
	};
	JenScript.Model.inheritPrototype(Test.TestPathBinderArcManual,JenScript.RadialGauge);
			
	JenScript.Model.addMethods(Test.TestPathBinderArcManual, {
		_init : function(config) {
			config = config || {};
			this.gaugeRadius = 130;
			config.radius = 130;
			JenScript.RadialGauge.call(this, config);

			//var env = new JenScript.Cisero();
			//this.setEnvelop(env);
			 //var bg = new JenScript.LinearGradientCircularBackground();
			//var bg = new JenScript.TextureCircularBackground();

			//this.addBackground(bg);

			this.body = new JenScript.GaugeBody();
			this.addBody(this.body);

			this.createSecondaryMetrics();
		},

		getTestPath : function() {
			return this.secondaryPathManager;
		},

		/**
		 * create secondary metrics label
		 */
		createSecondaryMetrics : function() {

			this.secondaryPathManager = new JenScript.GaugeMetricsPath();
			this.secondaryPathManager.setRange(-20, 20);


			var baseNeedleBinder = new JenScript.AnchorBaseBinder({radius : 4,angleDegree:0});
			var valueNeedleBinder = new JenScript.AnchorValueBinder({radialOffset:20});
			
			this.secondaryPathManager.setNeedleBaseAnchorBinder(baseNeedleBinder);
			this.secondaryPathManager.setNeedleValueAnchorBinder(valueNeedleBinder);
			this.secondaryPathManager.setCurrentValue(11);
			
			this.secondaryPathManager.setGaugeNeedlePainter(new JenScript.GaugeNeedleClassicPainter());
//			this.secondaryPathManager
//					.setPathBinder(new JenScript.PathArcAutoBinder({
//						debug : true,
//						radius : 120,
//						polarRadius : 140,
//						polarDegree : 30,
//						direction : 'AntiClockwise'
//					}));
			
			this.secondaryPathManager
			.setPathBinder(new JenScript.PathArcManualBinder({
				debug : true,
				radius : 100,
				startAngleDegree : 180,
				extendsAngleDegree : -180,
				shiftRadius : 0,
				shiftAngleDegree : 0
			}));
			
			//this.secondaryPathManager.setPathBinder(binder);
			this.body.registerGaugeMetricsPath(this.secondaryPathManager);

			var metric = new JenScript.GlyphMetric();
			metric.setValue(1);
			metric.setMetricsLabel("1");
			this.secondaryPathManager.addMetric(metric);

			
			metric = new JenScript.GlyphMetric();
			metric.setValue(-10);
			metric.setMetricsLabel("-10");
			this.secondaryPathManager.addMetric(metric);
			
			metric = new JenScript.GlyphMetric();
			metric.setValue(3);
			metric.setMetricsLabel("3");
			this.secondaryPathManager.addMetric(metric);

			metric = new JenScript.GlyphMetric();
			metric.setValue(5);
			metric.setMetricsLabel("5");
			this.secondaryPathManager.addMetric(metric);

			metric = new JenScript.GlyphMetric();
			metric.setValue(7);
			metric.setMetricsLabel("7");
			this.secondaryPathManager.addMetric(metric);

			metric = new JenScript.GlyphMetric();
			metric.setValue(9);
			metric.setMetricsLabel("9");
			this.secondaryPathManager.addMetric(metric);

			metric = new JenScript.GlyphMetric();
			metric.setValue(12);
			metric.setMetricsLabel("12");
			this.secondaryPathManager.addMetric(metric);

			metric = new JenScript.GlyphMetric();
			metric.setValue(15);
			metric.setMetricsLabel("15");
			this.secondaryPathManager.addMetric(metric);

			metric = new JenScript.GlyphMetric();
			metric.setValue(18);
			metric.setMetricsLabel("18");
			this.secondaryPathManager.addMetric(metric);
		}
	});
	var gauge = new Test.TestPathBinderArcManual();
	var gaugePlugin = new JenScript.RadialGaugePlugin({
		gauge : gauge
	});
	proj.registerPlugin(gaugePlugin);



}