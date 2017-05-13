
	JenScript.CalendarPlugin = function(config) {
		this._init(config);
	};
	JenScript.Model.inheritPrototype(JenScript.CalendarPlugin, JenScript.Plugin);
	JenScript.Model.addMethods(JenScript.CalendarPlugin, {
		
		_init : function(config){
			config = config || {};
			config.name = 'CalendarPlugin';
			JenScript.Plugin.call(this,config);
		},
		
	
		onProjectionRegister : function(){
			var that = this;
			this.getProjection().addProjectionListener('boundChanged', function(){
				that.repaintPlugin();
			},'calendar projection bound changed');
		},
		
		paintPlugin : function(g2d, part) {
			if (part !== JenScript.ViewPart.Device) {
				return;
			}
			
			console.log('paint calendar');

			
			//proj.getUserHeight
//			var minDate = proj.getMinDate();
//			var flag = true;
//			var d = minDate;
//			while(flag){
//				var d = new Date(d.getFullYear(),d.getMonth(),d.getDate()+1);
//				var pixelX = proj.timeToPixel(d);
//				var scatter = new JenScript.SVGRect().origin(pixelX,10).size(3,3).fill('red');
//				g2d.insertSVG(scatter.toSVG());
//				console.log("create point : "+pixelX);
//				if(d.getTime() > proj.getMaxDate().getTime())
//					flag = false;
//			}
		}
	});
 
function create(container, width, height) {

	var view = new JenScript.View({
		name : container,
		width : width,
		height : 400,
		holders : 0,
		north: 20,
		south :80,
	});
	
	

	var proj = new JenScript.IdentityProjection();
	view.registerProjection(proj);
	
	//device outline
	var outline = new JenScript.DeviceOutlinePlugin({color : 'darkslategrey'});
	proj.registerPlugin(outline);

	var calendar = new JenScript.CalendarPlugin({
		startDate : new Date(2013, 09, 01),
		duration : 365,
	});
	proj.registerPlugin(calendar);

	
	var tx1 = new JenScript.TranslatePlugin();
	proj.registerPlugin(tx1);

	tx1.select();
}

