var gl;
var theta;
var thetaLoc;
var scale;
var scaleLoc;
var fColor;
var fColorLoc;
constantly=false;
isDirClockwise=true;
partys=false
var delay = 75;

function partyFunc(){
	partys=!partys;
}
function buttonPressedFunc(){
	constantly=!constantly;
}

function scaleup(){
	scale += 0.1;
}

function scaledown(){
	scale -= 0.1;
}

window.onload = function init() {

	const canvas = document.querySelector("#glcanvas");
	// Initialize the GL context
	gl = WebGLUtils.setupWebGL(canvas);
	// Only continue if WebGL is available and working
	if (!gl) {
	alert("Unable to initialize WebGL. Your browser or machine may not support it.");
	return;
	}
  
	var program = initShaders(gl, "vertex-shader", "fragment-shader")
	gl.useProgram( program );
	
	var myButton = document.getElementById("DirectionButton"); 
	myButton.addEventListener("click", buttonPressedFunc);
	
	var myButton2 = document.getElementById("DirectionButton2"); 
	myButton2.addEventListener("click", scaleup);
	
	var myButton3 = document.getElementById("DirectionButton3"); 
	myButton3.addEventListener("click", scaledown);
	
	var myButton4 = document.getElementById("DirectionButton4"); 
	myButton4.addEventListener("click", partyFunc);
	
	var m = document.getElementById("mymenu");
	m.addEventListener("click", function() {
		switch (m.selectedIndex) {
			case 0:
				theta -= 0.1;
				break;
			case 1:
				if(delay>2)
					theta += 0.1;
				break;
			
		}
	});

	document.getElementById("slide").onchange = function() {scale = 1*this.value;};
	window.addEventListener("keydown", 
    function() {
      switch (event.keyCode) {
         case 37:
            theta += 0.1; // ’arrowleft’ key
            break;
         case 39: // ’arrowright’ key
            theta -= 0.1;
            break;
      }
   });
   window.addEventListener("keydown", 
    function() {
      switch (event.keyCode) {
         case 38:
            scale += 0.1; // ’arrowleft’ key
            break;
         case 40: // ’arrowright’ key
            scale -= 0.1;
            break;
      }
   });
   window.addEventListener("keydown", 
   function() {
      switch (event.keyCode) {
         case 49: // ’1’ key
            isDirClockwise = !isDirClockwise;
            break;
         case 50: // ’2’ key
            delay /= 2.0;
            break;
         case 51: // ’3’ key
            delay *= 2.0;
            break;
		case 13: // ’enter’ key
            constantly=!constantly;
            break;
      }
   });
	
	var vertices = [
				vec2(-.5, -.4),vec2(-.4, .4),vec2(-.5, .4),
				vec2(-.5, -.4),vec2(-.4, .4),vec2(-.4, -.4),
				
				vec2(-.4, -.4),vec2(-.1, -.4),vec2(-.1, -.3),
				vec2(-.4, -.4),vec2(-.1, -.3),vec2(-.4, -.3),
				
				vec2(-.4, .4),vec2(-.1, .4),vec2(-.1, .3),
				vec2(-.4, .4),vec2(-.1, .3),vec2(-.4, .3),
				
				vec2(-.1, .3),vec2(-.2, .3),vec2(-.5, .0),
				vec2(-.5, -.1),vec2(-.5, .0),vec2(-.1, .3),
				
				vec2(-.1, -.3),vec2(-.2, -.3),vec2(-.5, .0),
				vec2(-.5, .1),vec2(-.5, .0),vec2(-.1, -.3),
				
				
				vec2(.1, -.4),vec2(.1, .4),vec2(.2, .4),
				vec2(.1, -.4),vec2(.2, .4),vec2(.2, -.4),
				
				vec2(.1, .4),vec2(.2, .4),vec2(.4, -.4),
				vec2(.4, -.4),vec2(.5, -.4),vec2(.2, .4),
				
				vec2(.5, -.4),vec2(.4, .4),vec2(.5, .4),
				vec2(.5, -.4),vec2(.4, .4),vec2(.4, -.4),
				
				];

	
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
	
	// Associate out shader variables with our data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );
	
	thetaLoc = gl.getUniformLocation(program, "theta");
	scaleLoc = gl.getUniformLocation(program, "scale");
	fColorLoc = gl.getUniformLocation(program, "fColor");
	theta = 0;
	scale=1;
	
	gl.uniform1f(thetaLoc, theta);
	gl.uniform1f(scaleLoc, scale);
	gl.uniform4f(fColorLoc, Math.random(),Math.random(),Math.random(),1.0);
	
	// Set clear color to black, fully opaque
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	requestAnimFrame(render);
}

function render(){
	setTimeout(function() {
	    // Clear the color buffer with specified clear color
	    gl.clear(gl.COLOR_BUFFER_BIT);
		if (constantly)
			theta += (isDirClockwise ? -0.1 : 0.1);
	    gl.uniform1f(thetaLoc, theta);
	    gl.uniform1f(scaleLoc, scale);
		if(partys)
			gl.uniform4f(fColorLoc, Math.random(),Math.random(),Math.random(),1.0);
	    gl.drawArrays(gl.TRIANGLES, 0, 48);
	    render();
	    }, delay);
		
}
		