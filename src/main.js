import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useStore } from '@/store';
import App from './App.vue';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);

const store = useStore();

app.directive('description', (el, binding) => {
	el.addEventListener('mouseover', () => {
		store.updateDescriptionText(binding.value);
	});
	el.addEventListener('mouseout', () => {
		store.updateDescriptionText('');
	});
})

app.mount('#app');
