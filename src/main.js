import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index.js";

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import store from "@/store/index.js";

const vuetify = createVuetify({
    components,
    directives,
    display: {
        mobileBreakpoint: 'sm',
        thresholds: {
            xs: 0,
            sm: 340,
            md: 540,
            lg: 800,
            xl: 1280,
        },
    },
})
createApp(App)
    .use(router)
    .use(vuetify)
    .use(store)
    .mount('#app')
