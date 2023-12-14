<script setup>
import { complex, pow, add, divide, multiply, subtract } from 'mathjs';
import p5 from 'p5';

import { ref } from 'vue';
import { updateDescriptionText } from '../../updateDescriptionText.js';
import { colorFractalBefore, colorFractalAfter, UpdateColorPalettes, coloringMethods, palettes } from '../coloringMethods.js';
const emit = defineEmits(['descText', 'changeCanvas']);
const props = defineProps({
	iterationNum: Number,
	boundaryNum: Number,
});

//define our fractal-specific properties
const fracName = "TEST";
const xOffset = ref(0);
const yOffset = ref(0);
const exponent = ref(2);
const zoom = ref(200);
const xPan = ref(2);
const yPan = ref(1.5);
const coloringSet = ref([coloringMethods.Iteration, coloringMethods.Normalized]);
const coloring = ref(coloringMethods.Iteration);
const paletteSet = ref(UpdateColorPalettes(coloring.value));
const currentPalette = ref(palettes.Iteration_Normalized.Classic);

//load our shader
//const shader = p5.loadShader('./passthrough.vert', './Mandelbrot.frag');

//rests properties to their default values
function reset() {
	xOffset.value = 0;
	yOffset.value = 0;
	exponent.value = 2;
	zoom.value = 200;
	xPan.value = 2;
	yPan.value = 1.5;
	coloring.value = coloringMethods.Iteration;
	paletteSet.value = UpdateColorPalettes(coloring.value);
	currentPalette.value = palettes.Iteration_Normalized.Classic;
}

//fractal rendering function
function Render(maxIterations, boundary) {
	console.log("Rendering TEST");


	emit('changeCanvas', (sketch) => {
		sketch.pixelDensity(1);
		sketch.loadPixels();


		//begin iterating through our canvas to color each point
		for (let x = 0; x < 600; x++) {
			for (let y = 0; y < 600; y++) {
				//call function to determine whether or not the point is in the set
				//let isInSet = fractalLogic(maxIterations, boundary, x / zoom.value - xPan.value, y / zoom.value - yPan.value);

				//color the point
				//colorFractalAfter(isInSet, coloring.value, currentPalette.value, ctx, x, y);


				let pix = (x + y * 600) * 4;
				sketch.pixels[pix + 0] = 5;
				sketch.pixels[pix + 1] = 5;
				sketch.pixels[pix + 2] = 5;
				sketch.pixels[pix + 3] = 255;



			}
			//set progress bar width
			//console.log((x / can.width) * 100 + "%");
		}

		sketch.updatePixels();
	});

	//complete fractal rendering
	console.log("Rendering Finished");

}

//determine whether a point is inside the fractal set or not. Apply zooming and panning
function fractalLogic(maxIterations, boundary, x, y) {
	//initialize complex number components
	let cx = x + xOffset.value;
	let cy = y + yOffset.value;

	//pre-calculate part of our inverted mandelbrot equation, because for this current point, x and y are constant and do not change
	//this is a nice optimziation tool
	let xx = (x / (Math.pow(x, 2) + Math.pow(y, 2)));
	let yy = -(y / (Math.pow(x, 2) + Math.pow(y, 2)));

	//temp (mathjs)
	//let c = complex(x, y);
	//let z = complex(0 + xOffset, 0 + yOffset);
	//let zz = complex(0, 2);

	//iterate over the fractal function
	for (let i = 0; i < maxIterations; i++) {

		//z = pow(z, exponent.value).add(c);  //mandelbrot (mathjs)
		//z = pow(z, 2).add(divide(1, c)); //inverted mandelbrot (mathjs)
		//z = multiply(c, z).multiply(subtract(1, z));
		//z = multiply(multiply(c, z), subtract(1, z));  //lambda mandelbrot (mathjs) where lambda is c. change z initializer to [0.5, 0] c * z * (1 - z)
		//let zx = z.re; //(mathjs)
		//let zy = z.im; //(mathjs)

		let zx = xx + (Math.pow(cx, 2) - Math.pow(cy, 2)); //code for inverted mandelbrot
		let zy = yy + (2 * cx * cy);

		//let tempx = (1 - cx) * 0x + cy * 0y;
		//let tempy = (1 - cx) * 0y - 0x * cy;

		//let zx = cx * cx - cy * cy + x;
		//let zy = 2 * cx * cy + y;

		//periodicity checking
		//if (zx == cx && zy == cy){
		//  return false;
		//}

		//update components of imaginary number for next iteration
		cx = zx;
		cy = zy;

		//if point is outside fractal boundaries, return number of iterations
		if (cx * cx + cy * cy >= boundary) {
			return colorFractalBefore(coloring.value, cx, cy, i);
		}
	}
	//point is not in the set, return 0
	return false;
}

//helper function to change color palette options
function UpdateColorPalettes_Helper() {
	paletteSet.value = UpdateColorPalettes(coloring.value);
}
</script>

<template>
	<div @mouseover="emit('descText', updateDescriptionText('The X offset value to start rendering the fractal from'))" @mouseleave="emit('descText', updateDescriptionText(''))">
		<label for="xOffset">X offset: </label>
		<input v-model="xOffset" id="xOffset" type="number" name="xOffset" min="-1000" max="1000" />
	</div>
	<br />
	<div @mouseover="emit('descText', updateDescriptionText('The Y offset value to start rendering the fractal from'))" @mouseleave="emit('descText', updateDescriptionText(''))">
		<label for="yOffset">Y offset: </label>
		<input v-model="yOffset" id="yOffset" type="number" name="yOffset" min="-1000" max="1000" />
	</div>
	<br />
	<div @mouseover="emit('descText', updateDescriptionText('The value to use as the exponent in the fractal equasion: Z = Z^n'))" @mouseleave="emit('descText', updateDescriptionText(''))">
		<label for="exponent">Exponent: </label>
		<input v-model="exponent" id="exponent" type="number" name="exponent" min="-100" max="100" />
	</div>
	<br />
	<div @mouseover="emit('descText', updateDescriptionText('How far to zoom into the fractal. Larger values = deeper zoom'))" @mouseleave="emit('descText', updateDescriptionText(''))">
		<label for="zoom">Zoom: </label>
		<input v-model="zoom" id="zoom" type="number" name="zoom" />
	</div>
	<br />
	<div @mouseover="emit('descText', updateDescriptionText('How much to pan the rendering of the fractal on the X axis. Positive values = pan to the right'))" @mouseleave="emit('descText', updateDescriptionText(''))">
		<label for="xPan">X pan: </label>
		<input v-model="xPan" id="xPan" type="number" name="xPan" min="-100" max="100" />
	</div>
	<br />
	<div @mouseover="emit('descText', updateDescriptionText('How much to pan the rendering of the fractal on the Y axis. Positive values = pan down'))" @mouseleave="emit('descText', updateDescriptionText(''))">
		<label for="yPan">Y pan: </label>
		<input v-model="yPan" id="yPan" type="number" name="yPan" min="-100" max="100" />
	</div>
	<br />
	<div @mouseover="emit('descText', updateDescriptionText('The type of coloring function used when determining how to color the fractal'))" @mouseleave="emit('descText', updateDescriptionText(''))">
		<label for="coloring">Coloring Method: </label>
		<select v-model="coloring" @change="UpdateColorPalettes_Helper()" id="coloring" name="coloring">
			<option v-for="item in coloringSet" :value=item>{{ item }}</option>
		</select>
	</div>
	<br />
	<div @mouseover="emit('descText', updateDescriptionText('The color palette used to color the fractal based on the coloring function'))" @mouseleave="emit('descText', updateDescriptionText(''))">
		<label for="currentPalette">Color Palette: </label>
		<select v-model="currentPalette" id="currentPalette" name="currentPalette">
			<option v-for="item in paletteSet" :value=item>{{ item }}</option>
		</select>
	</div>
	<br />
	<div id="footer">
		<input id="resetButton" @mouseover="emit('descText', updateDescriptionText('Resets the properties to their default values'))" @mouseleave="emit('descText', updateDescriptionText(''))" @click="reset()" type="button" value="Reset" />
		<input id="renderButton" @mouseover="emit('descText', updateDescriptionText('Renders the fractal with all of its properties in the corrisponding panel'))" @mouseleave="emit('descText', updateDescriptionText(''))" @click="Render(iterationNum, boundaryNum)" type="button" value="Render" />
	</div>
</template>

<style scoped>
#resetButton {
	float: left;
}

#renderButton {
	float: right;
}

#footer {
	vertical-align: bottom;
}
</style>
