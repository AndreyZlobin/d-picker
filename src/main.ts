import {createApp} from 'vue'
import {clickOutside} from "~/directives";
import App from './App.vue'
import './index.css'

const app = createApp(App);

app.directive("click-outside", clickOutside);

app.mount('#app')
