// import './assets/main.css'

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(router).use(vuetify).use(VueDatePicker).mount("#app");
