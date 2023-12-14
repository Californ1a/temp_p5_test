<script setup>
import { ref } from 'vue';
//-----import all of our fractals here-----//
import Mandelbrot from './fractals/Mandelbrot.vue';
import Julia from './fractals/Julia.vue';
import TEST from './fractals/TEST.vue';
//-----end import fractals-----//

// import { updateDescriptionText } from '../updateDescriptionText.js';

const emit = defineEmits(['changeCanvas']);
const props = defineProps({
	canvas: HTMLCanvasElement,
	context: CanvasRenderingContext2D,
	iterationNum: Number,
	boundaryNum: Number,
});

let currentFrac = ref(""); //stores currently selected fractal

//add all of our fractal's we're importing into this array so our program can automatically add them to our dropdown list
//const fractalList = ref([Mandelbrot]);
//console.log({fractalList});
</script>

<template>
	<div v-description="'Select which fractal you wish to render'">
		<label for="fractalSelector">Fractal: </label>

		<select v-model="currentFrac" id="fractalSelector" name="fractalSelector">
			<!--<option v-for="fractal in fractalList" value={{ fractal.fracName }}>
                {{ fractal.fracName }}
            </option>-->
			<optgroup label="Built-in">
				<option value="Mandelbrot">Mandelbrot</option>
				<option value="Julia">Julia</option>
				<option value="TEST">TEST</option>
			</optgroup>
		</select>
	</div>
	<br /><br />
	<div>
		<span v-show="currentFrac==='Mandelbrot'">
			<Mandelbrot :canvas="canvas" :context="context" :iterationNum="iterationNum" :boundaryNum="boundaryNum" />
		</span>
		<span v-show="currentFrac==='Julia'">
			<Julia :canvas="canvas" :context="context" :iterationNum="iterationNum" :boundaryNum="boundaryNum" />
		</span>
		<span v-show="currentFrac==='TEST'">
			<TEST @changeCanvas="emit('changeCanvas', $event)" :iterationNum="iterationNum" :boundaryNum="boundaryNum" />
		</span>
	</div>
</template>

<style scoped>

</style>
