<script setup>
import { ref, onMounted } from 'vue';
import { updateDescriptionText } from '../updateDescriptionText.js';
const emit = defineEmits(['descText', 'iterationNum', 'resolutionNum', 'boundaryNum']);

//define our general properties for all fractals
const iterationCount = ref(250);
const resolutionMulti = ref(1);
const boundaries = ref(5);

//rests properties to their default values
function reset() {
	iterationCount.value = 250;
	resolutionMulti.value = 1;
	boundaries.value = 5;

	emit('iterationNum', iterationCount.value);
	emit('resolutionNum', resolutionMulti.value);
	emit('boundaryNum', boundaries.value);
}

//one we have successfully mounted to our data elements, pass up the data to the parent
onMounted(() => {
	emit('iterationNum', iterationCount.value);
	emit('resolutionNum', resolutionMulti.value);
	emit('boundaryNum', boundaries.value);
})
</script>

<template>
	<div @mouseover="emit('descText', updateDescriptionText('The number of iterations to perform when determining whether a point is in the set. Larger number = deeper render, but is slower to render'))" @mouseleave="emit('descText', updateDescriptionText(''))">
		<label for="iterationCount">Iteration Count: </label>
		<input v-model="iterationCount" id="iterationCount" type="number" name="iterationCount" min="1" @input="emit('iterationNum', iterationCount)" />
	</div>
	<br />
	<div @mouseover="emit('descText', updateDescriptionText('Determines the resolution of the canvases to change the detail of the result. Higher resolution = more detail, but is slower to render'))" @mouseleave="emit('descText', updateDescriptionText(''))">
		<label for="resolutionMulti">Resolution Multiplier: </label>
		<input v-model="resolutionMulti" id="resolutionMulti" type="number" name="resolutionMulti" min="1" max="100" @input="emit('resolutionNum', resolutionMulti)" />
	</div>
	<br />
	<div @mouseover="emit('descText', updateDescriptionText('When a point on the canvas exceeds this value, the point is assumed to grow to infinity and is considered outside of the fractal. Higher values = bigger radius to render the fractal, but is slower to render'))" @mouseleave="emit('descText', updateDescriptionText(''))">
		<label for="boundaries">Boundary Radius: </label>
		<input v-model="boundaries" id="boundaries" type="number" name="boundaries" min="1" max="100" @input="emit('boundaryNum', boundaries)" />
	</div>
	<br />
	<div id="footer">
		<input id="resetButton" @mouseover="emit('descText', updateDescriptionText('Resets the properties to their default values'))" @mouseleave="emit('descText', updateDescriptionText(''))" @click="reset()" type="button" value="Reset" />
	</div>
</template>

<style scoped>
#resetButton {
	float: left;
}

#footer {
	vertical-align: bottom;
}
</style>
