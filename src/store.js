import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStore = defineStore('main', () => {
	const defaultDescription = 'Hover over UI elements to view information here';
	const descriptionText = ref(defaultDescription);

	function updateDescriptionText(text) {
		descriptionText.value = text || defaultDescription;
	}

	return { descriptionText, updateDescriptionText }
});
