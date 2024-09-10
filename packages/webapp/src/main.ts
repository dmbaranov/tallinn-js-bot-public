import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import App from './App.vue';

const vuetify = createVuetify({
  components,
  directives,
});

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/talk',
      component: () => import('./pages/CreateTalk.vue'),
    },
    {
      path: '/talk/:id',
      component: () => import('./pages/EditTalk.vue'),
    },
  ],
});

const app = createApp(App);
app.use(router);

router.isReady().then(() => app.use(vuetify).mount('#app'));
