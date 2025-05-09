import { createApp }  from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Notifications from '@kyvg/vue3-notification'
import Paginate from "vuejs-paginate-next";
import {bootstrapVue} from 'bootstrap-vue-next';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'vue-search-select/dist/VueSearchSelect.css'

const app = createApp(App);
app.use(Notifications);
app.use(Paginate);
app.use(bootstrapVue);

app.config.globalProperties.$url = 'https://api-nishinashop.onrender.com/api';
app.config.globalProperties.$token = localStorage.getItem('token');
app.config.globalProperties.$ganancia = 30;

app.use(store).use(router).mount('#app');
