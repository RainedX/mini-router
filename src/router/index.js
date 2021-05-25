import { render } from 'less';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children: [
      {
        path: 'a',
        name: 'aboutA',
        component: {
          render(h) {
            return <div>about子页面a</div>;
          },
        },
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
