import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faUserSecret, faUniversity, faTimes, faEye, faTrash, faAngleDoubleRight, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons/'
import { FontAwesomeIcon  } from '@fortawesome/vue-fontawesome'

library.add(faEdit, faUserSecret, faUniversity, faTimes, faEye, faTrash, faAngleDoubleRight,faToggleOn, faToggleOff);

Vue.component('font-awesome-icon', FontAwesomeIcon );

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
