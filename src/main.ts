import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { /* Project icons */    
    faArrowLeft
} from '@fortawesome/free-solid-svg-icons'

import App from './App.vue';
import router from './router';
import Layout from './components/Layout.vue';

import './assets/css/bootstrap.min.css';
import './assets/css/bootstrap-icons.css';
import './assets/css/main.css';

import './assets/js/jquery.min.js'
import './assets/js/bootstrap.bundle.min.js'
import './assets/js/jquery.sticky.js'
// import './assets/js/click-scroll.js'
import './assets/js/template.js'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);

app.component('default-layout', Layout);

app.component('font-awesome-icon', FontAwesomeIcon)

/* Sweetalert2 */
app.use(VueSweetalert2);

/* app routes */
app.use(router);

/* add icons to the library */
library.add(faArrowLeft) 

app.mount('#app');
