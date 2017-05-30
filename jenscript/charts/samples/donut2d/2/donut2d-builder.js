
createView = function(container,w,h){

		JenScript.view({
			name : container,
			width : w,
			height : h,
			holders : 0,
			north: 20,
			south :20,
		}).projection('linear',{
			name : "proj1",
			minX : -1000,
			maxX : 1000,
			minY : -1000,
			maxY : 1000
		}).donut2d({
			innerRadius :  80,
			outerRadius :  120
		}).slice({
			name : "s1",
			value : 45,
			themeColor : 'rgba(240, 240, 240, 0.9)',
		}).label('radial',{
			text : "Silver",
			fillColor:'black',
			outlineColor : 'rgba(240, 240, 240, 0.9)',
			cornerRadius : 8,
			outlineWidth : 2,
			textColor :'rgba(240, 240, 240, 0.9)',
		}).slice({
			name : "s2",
			value : 5,
			themeColor : '#d35400'
		}).label('radial',{
			text : "Platinium",
			fillColor:'black',
			outlineColor : '#d35400',
			cornerRadius : 8,
			outlineWidth : 2,
			textColor :'#d35400',
		}).slice({
			name : "s3",
			value : 30,
			themeColor : '#2980b9'
		}).label('radial',{
			text : "Rhodium",
			fillColor:'black',
			outlineColor : '#2980b9',
			cornerRadius : 8,
			outlineWidth : 2,
			textColor :'#2980b9',
		}).slice({
			name : "s4",
			value : 5,
			themeColor : '#27ae60',
			divergence : 30,
		}).label('border',{
			text : "Chrome",
			fillColor:'black',
			outlineColor : '#27ae60',
			cornerRadius : 8,
			outlineWidth : 2,
			textColor : '#27ae60',
			margin : 100
		}).slice({
			name : "s5",
			value : 5,
			themeColor : '#8e44ad'
		}).label('radial',{
			text : "Uranium",
			fillColor:'black',
			outlineColor : '#8e44ad',
			cornerRadius : 8,
			outlineWidth : 2,
			textColor :'#8e44ad'
		}).linearFx({offset : 2, fillOpacity : 0.4,incidence : 120,shader :{percents : [ '0%', '49%', '51%', '100%' ],opacity:[0.2,0,0,0.2], colors : ['rgb(60, 60, 60)', 'rgb(255,255,255)','rgb(255,255,255)','rgb(255, 255, 255)']}
		}).linearFx({offset :6,fillOpacity : 0.8,incidence : 240,shader :{percents : [ '0%', '49%', '51%', '100%' ],opacity:[0.2,0,0,0.2], colors : ['rgb(60, 60, 60)', 'rgb(255,255,255)','rgb(255,255,255)','rgb(255, 255, 255)']}
		}).reflectFx({});
}