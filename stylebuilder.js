
var name ="button_huge";
var variants = ['default', "red", "green"];
var dpi = ["",'mdpi', "hdpi", "xhdpi", "xxhdpi"];
var states = ["normal","pressed"];



var options = {
	variants : {
		default: {
			normalTextColor : "#000000",
			activeTextColor : "#ffffff",
			startColor 	: "#ecebeb",
			endColor 	: "#f3f3f3",
			shadowColor : "#707070",
			borderColor : "#707070",
			activeColor : "#474646",
			cornerRadius: "5dp",
			borderWidth : "1dp",
			shadowHeight: "4dp",
			angle       : "0"
		},
		red: {
			normalTextColor : "#000000",
			activeTextColor : "#000000",
			activeColor : "#4a1614",
			startColor 	: "#fa5343",
			endColor 	: "#f94444",
			shadowColor : "#7e0d09",
			borderColor : "#7e0d09",
			cornerRadius: "5dp",
			borderWidth : "3dp",
			shadowHeight: "4dp",
			angle       : "0"
		},
		green: {
			normalTextColor : "#",
			activeTextColor : "#",			
			startColor 	: "#00bf53",
			endColor 	: "#00c062",
			shadowColor : "#277d53",
			borderColor : "#277d53",
			activeColor : "#00391c",
			cornerRadius: "5dp",
			borderWidth : "3dp",
			shadowHeight: "4dp",
			angle       : "0"
		}
	}
	
}

function getValue(valueName, variant, dpi, state){

	//Selected variant
	var cVariant = options.variants[variant];
	var ret = cVariant[valueName];

	switch (valueName){
		case "shadowHeight":
			if (state == "pressed"){
				ret = "0dp";
			}
		break;
		case "startColor":
		case "endColor":
			if (state == "pressed"){
				ret = cVariant.activeColor;
			}
			break;

	}

	

	return ret;
/*
	switch (state){
		case "pressed":

			break;
		default:

		break;

	}
	*/

}


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
var builder = require('xmlbuilder');


function write_file(directory, fileName, contents){
	console.log("writing: " + directory + "/" + fileName);
	fullFileName = directory + "/" + fileName;

	fs.writeFile(fullFileName, contents, function(err) {
	    if(err) {
	        console.log(err);
	    } else {
	        console.log("saved.");
	    }
	});
		
	//console.log(contents); 	
}


function print_selector(variant){
	//console.log("printing selector for variant " + variant);
	var xml = builder.create("selector");
	xml = xml.att("xmlns:android",'http://schemas.android.com/apk/res/android')
		.ele("item")
			.att("android:drawable", "@drawable/" + name + "_" + variant + "_pressed")
			.att("android:state_pressed", "true")
		.up().ele("item")
			.att("android:drawable", "@drawable/" + name + "_" + variant + "_normal")
		.end({pretty: true})

	var dirName = "drawable"
	write_file(dirName, "selector_" + name + "_" + variant + ".xml", xml);

}

function print_drawable(variant, dpi, state){
	
	var xml = builder.create('layer-list');


		xml = xml.att("xmlns:android",'http://schemas.android.com/apk/res/android')
		.ele("item")
			.ele("shape")
				.att("android:shape", "rectangle")
				.ele("corners")
					.att("android:radius", cornerRadius)
				.up()
				.ele("solid")
					.att("android:color", getValue("shadowColor", variant, dpi, state))

		.up().up().up().ele("item")
			.att("android:bottom", getValue("shadowHeight", variant, dpi, state))
			.ele("shape")
				.att("android:shape", "rectangle")

				.ele("corners")
					.att("android:radius", cornerRadius)

				.up().ele("gradient")
					.att("android:startColor", getValue("startColor", variant, dpi, state))
					.att("android:endColor", getValue("endColor", variant, dpi, state))
					.att("android:angle", angle)
				.up().ele("stroke")
					.att("android:width", getValue("borderWidth", variant, dpi, state))
					.att("android:color", getValue("borderColor", variant, dpi, state))
	  .end({ pretty: true});
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

selectedVariants.forEach(function(variant){
	print_selector(variant)
})



