<script setup>
import { ref } from 'vue'
import FractalViewer from './components/FractalViewer.vue';
import { useStore } from '@/store';

const store = useStore();

const viewMode = {
	fractal: 1,
	graph: 2
}

let currentViewMode = ref(viewMode.fractal);

//functions
</script>

<template>
	<header>
	</header>

	<main>
		<p id="versionNum">v0.8</p>
		<div>
			<FractalViewer />
		</div>
		<table id="footer">
			<tr>
				<td colspan="2">
					<p class="center-text" id="viewFrac_infoBox">{{ store.descriptionText }}</p>
				</td>
				<td>
					<input class="SwitchViews" type="button" value="Switch views" />
				</td>
			</tr>
		</table>
	</main>
</template>

<style scoped>
@import './assets/main.css';

#versionNum {
	position: relative;
	font-size: 16px;
	font-weight: bold;
	left: -12rem;
}

#viewFrac_infoBox {
	font-weight: bold;
	font-size: 20x;

	display: inline-block;
	margin: 0%;
	letter-spacing: -0.25px;
}

#footer {
	position: relative;
	width: 1610px;
	left: -12rem;
}
</style>
