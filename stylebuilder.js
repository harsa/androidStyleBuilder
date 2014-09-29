
var name ="button_huge";
var variants = ['default', "red", "green"];
var dpi = ["",'mdpi', "hdpi", "xhdpi", "xxhdpi"];
var states = ["normal","pressed"];





var startColor 	= "#ecebeb";
var endColor 	= "#f3f3f3";
var shadowColor = "#707070";
var borderColor = "#707070";
var cornerRadius = "5dp";
var borderWidth = "3dp";
var shadowHeight ="4dp";
var angle ="0";

var textColor = "";
var textShadowColor = "";

var fs = require('fs');

function write_file(directory, fileName, contents){
	console.log("writing: " + directory + "/" + fileName);
	fullFileName = directory + "/" + fileName;
/*
	fs.writeFile(fullFileName, contents, function(err) {
	    if(err) {
	        console.log(err);
	    } else {
	        console.log("saved: " + fullFileName);
	    }
	});
	*/
	console.log(contents); 	
}


function print_drawable(variant, dpi, state){
	var builder = require('xmlbuilder');
	var xml = builder.create('layer-list');


		xml =  xml + xml.att("xmlns:android",'http://schemas.android.com/apk/res/android')
		.ele("item")
			.ele("shape")
				.att("android:shape", "rectangle")
				.ele("corners")
					.att("android:radius", cornerRadius)
				.up()
				.ele("solid")
					.att("android:color", "#707070")

		.up().up().up().ele("item")
			.att("android:bottom", shadowHeight)
			.ele("shape")
				.att("android:shape", "rectangle")

				.ele("corners")
					.att("android:radius", cornerRadius)

				.up().ele("gradient")
					.att("android:startColor", startColor)
					.att("android:endColor", endColor)
					.att("android:angle", angle)
				.up().ele("stroke")
					.att("android:width", borderWidth)
					.att("android:color", borderColor)
	  .end({ pretty: false, offset: 0});
	  //console.log("printing " + variant + " " + dpi + " " + state );
	  //console.log("drawable" + (dpi.length > 0 ? "_" + dpi : "")   + "/" + name + "_" + variant + "_" + state + ".xml")
	  var dirName = "drawable" + (dpi.length > 0 ? "-" + dpi : "");
	  write_file(dirName, name + "_" + variant + "_" + state + ".xml", xml);
	//console.log(xml);
}
var selectedVariants, selectedDpis, selectedStates;
	selectedVariants = variants;
	//selectedDpis = dpi.slice(0,1);
	selectedDpis = dpi.slice(1,2);
	selectedStates = states;

var selectedVariant, selectedDpi, selectedState;
for (var i  = selectedVariants.length - 1; i >= 0; i--) {
	selectedVariant = selectedVariants[i];

	for (var j = selectedDpis.length - 1; j >= 0; j--) {
		selectedDpi = selectedDpis[j]

		//console.log(states.length);
		for (var k = 0; k < states.length; k++){
		//for (var k = selectedStates.length - 1; k >= 0; k--) 

			selectedState = states[k];

			print_drawable(selectedVariant, selectedDpi, selectedState);
		}
	}
}
