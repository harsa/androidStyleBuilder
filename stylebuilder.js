var names = ['button_normal','button_huge', 'button_huge_buttonbar']
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
			borderWidth : "3dp",
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

function getValue(valueName, name, variant, dpi, state){

	//Selected variant
	var cVariant = options.variants[variant];
	var ret = cVariant[valueName];

	switch (valueName){
		case "cornerRadius":
			if (name == "button_huge_buttonbar"){
				ret = "0dp";
			}

			break;
		case "shadowHeight":
		
			if (state == "pressed"){
				ret = "0dp";
			} else if (name == "button_huge"){
				ret = "10dp";	
			} else if (name == "button_normal"){
				ret = "4dp";
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


function print_selector(name, variant){
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

function print_drawable(variant, name, dpi, state){
	
	var xml = builder.create('layer-list');


		xml = xml.att("xmlns:android",'http://schemas.android.com/apk/res/android')
		.ele("item")
			.ele("shape")
				.att("android:shape", "rectangle")
				.ele("corners")
					.att("android:radius", getValue("cornerRadius", name, variant, dpi, state))
				.up()
				.ele("solid")
					.att("android:color", getValue("shadowColor", name, variant, dpi, state))

		.up().up().up().ele("item")
			.att("android:bottom", getValue("shadowHeight", name, variant, dpi, state))
			.ele("shape")
				.att("android:shape", "rectangle")

				.ele("corners")
					.att("android:radius", getValue("cornerRadius", name, variant, dpi, state))

				.up().ele("gradient")
					.att("android:startColor", getValue("startColor", name, variant, dpi, state))
					.att("android:endColor", getValue("endColor", name, variant, dpi, state))
					.att("android:angle", angle)
				.up().ele("stroke")
					.att("android:width", getValue("borderWidth", name, variant, dpi, state))
					.att("android:color", getValue("borderColor", name, variant, dpi, state))
	  .end({ pretty: true});
	  //console.log("printing " + variant + " " + dpi + " " + state );
	  //console.log("drawable" + (dpi.length > 0 ? "_" + dpi : "")   + "/" + name + "_" + variant + "_" + state + ".xml")
	  var dirName = "drawable" + (dpi.length > 0 ? "-" + dpi : "");
	  write_file(dirName, name + "_" + variant + "_" + state + ".xml", xml);
	//console.log(xml);
}


var selectedNames, selectedVariants, selectedDpis, selectedStates;
	selectedNames = names;
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

			selectedNames.forEach(function(name){
				print_drawable(selectedVariant, name, selectedDpi, selectedState);				
			})

			//print_drawable(selectedVariant, names[0], selectedDpi, selectedState);
			//print_drawable(selectedVariant, names[0], selectedDpi, selectedState);
		}
	}
}

selectedVariants.forEach(function(variant){
	//TODO: include names
	print_selector(names[0], variant)
	print_selector(names[1], variant)
	print_selector(names[2], variant)
})



