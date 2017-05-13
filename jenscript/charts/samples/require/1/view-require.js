
createView = function(j,container,w,h){

		j.view({
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
		}).pie({
			radius : 120,
			startAngleDegree : 45
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
			textColor :j.Color.lighten('rgba(240, 240, 240, 0.9)',20),
		}).slice({
			name : "s2",
			value : 5,
			themeColor : j.RosePalette.LIME
		}).label('radial',{
			text : "Platinium",
			fillColor:'black',
			outlineColor : j.Color.lighten(j.RosePalette.CORALRED,20),
			cornerRadius : 8,
			outlineWidth : 2,
			textColor :j.Color.lighten(j.RosePalette.CORALRED,40),
		}).slice({
			name : "s3",
			value : 30,
			themeColor : 'rgba(78,148,44,1)'
		}).label('radial',{
			text : "Rhodium",
			fillColor:'black',
			outlineColor : 'rgba(78,148,44,1)',
			cornerRadius : 8,
			outlineWidth : 2,
			textColor :j.Color.lighten('rgba(78,148,44,1)',30),
		}).slice({
			name : "s4",
			value : 5,
			themeColor : j.RosePalette.MANDARIN,
			divergence : 30,
		}).label('border',{
			text : "Chrome",
			fillColor:'black',
			outlineColor : j.RosePalette.MANDARIN,
			cornerRadius : 8,
			outlineWidth : 2,
			textColor :j.Color.lighten(j.RosePalette.MANDARIN,30),
			margin : 100
		}).slice({
			name : "s5",
			value : 5,
			themeColor : j.RosePalette.INDIGO
		}).label('radial',{
			text : "Uranium",
			fillColor:'black',
			outlineColor : j.Color.lighten(j.RosePalette.INDIGO,30),
			cornerRadius : 8,
			outlineWidth : 2,
			textColor :j.Color.lighten(j.RosePalette.INDIGO,50)
		}).effect('linear',{offset : 0,incidence : 300}).effect('reflection');




}