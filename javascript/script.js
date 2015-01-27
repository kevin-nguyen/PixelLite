var pixID = 0;

function assignID() {
	if (pixID > 1000) {pixID = 0;}
	return pixID++;
}

function randColor() {
	var red = Math.floor(Math.random() * 255) + 1;
	var blue = Math.floor(Math.random() * 255) + 1;
	var green = Math.floor(Math.random() * 255) + 1;

	return 'rgb(' + red + ',' + green + ',' + blue + ')';
}

function genPixel(density) {
	var pixLen = 700/density - 2;
	var pixelClass = {"float": "left", "background-color": "black", "height": pixLen, "width": pixLen,
					"border": "white 1px solid", "margin": "0px", "border-radius": pixLen*.15};
	$('.wrapper').empty();	
	pixID = 0;			
	for (var i = 1; i <= density * density; i++) {
		$('.wrapper').append("<div></div>").find('div:last').css(pixelClass);
	}

}

// function colorFade(red, green, blue, pixNum) {
// 	var rgbString = 'rgb(' + red + ',' + green + ',' + blue + ')';
// 	$('#' + pixNum).css("background-color", rgbString);
			
//  }

$(document).ready(function() {
	$('input').on('focusout', function() {
		var pixelDensity = $(this).val();

		genPixel(pixelDensity);
	});

	$('.wrapper').on('mouseenter', 'div', function() {
		
		$(this).css("background-color", randColor).attr("id", ''+assignID());

	});

	$('.wrapper').on('mouseleave', 'div', function() {
		var rgb = $(this).css("background-color");
		var rgbColor = rgb.split(',');
 		var red = parseInt(rgbColor[0].substr(4));
		var green = parseInt(rgbColor[1]);
 		var blue = parseInt(rgbColor[2]);
 		var rDelta = Math.ceil(red * .03);
 		var gDelta = Math.ceil(green * .03);
 		var bDelta = Math.ceil(blue * .03);
 		var pixNum = $(this).attr("id");

 		var quit = setInterval(function() {
			red -= rDelta;
			blue -= bDelta;
			green -= gDelta;

			if (red < 0) { red = 0};
			if (green < 0) { green = 0};
			if (blue < 0) { blue = 0};
			console.log('rgb(' + red + ',' + green + ',' + blue + '), ID: ' + pixNum)
			
			var rgbString = 'rgb(' + red + ',' + green + ',' + blue + ')';
			$('#' + pixNum).css("background-color", rgbString);

			if (red === 0 && blue === 0 && green === 0) {
				$('#' + pixNum).removeAttr('id');
				clearInterval(quit);};
		}, 300);
	});
});