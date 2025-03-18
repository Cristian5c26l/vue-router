import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/modules/landing/pages/HomePage.vue';
import NotFoun404 from '@/modules/common/NotFoun404.vue';
import isAuthenticatedGuard from '@/modules/auth/guards/is-authenticated.guard';

export const router = createRouter({
  // exportacion manual
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Landing
    {
      path: '/',
      name: 'landing',
      component: () => import('@/modules/landing/layouts/LandingLayout.vue'),
      children: [
        {
          path: '/', // Esto hace referencia a donde corre la aplicacion seguido de un '/', es decir, http://localhost:5173/
          name: 'home', // name sirve para llegar a la ruta "/" ("http://localhost:5173/") mediante "home" en este caso
          component: HomePage,
        }, // Cuando se vaya a http://localhost:5173/ desde el navegador web se mostrará el componente HomePage
        {
          path: '/features',
          name: 'features',
          component: () => import('@/modules/landing/pages/FeaturesPage.vue'),
        },
        {
          path: '/contact',
          name: 'contact',
          component: () => import('@/modules/landing/pages/ContactPage.vue'),
        },
        {
          path: '/pricing',
          name: 'pricing',
          component: () => import('@/modules/landing/pages/PricingPage.vue'),
        },
        {
          path: '/pokemon/:id',
          name: 'pokemon',
          // beforeEnter: [(to, from, next) => {return next()}]
          // props: true,
          beforeEnter: [isAuthenticatedGuard],
          props: (route) => {
            // console.log({ route });
            // console.log({ id: route.params.id });// route.params.id por defecto es de tipo string.

            const id = Number(route.params.id); // serializar string a number. Number(route.params.id) es lo mismo que hacer +route.params.id

            return isNaN(id) ? { id: 1 } : { id }; // podria enviar {id: 1, prop2: 'value2, etc: 'etc}
          },
          component: () => import('@/modules/pokemons/pages/PokemonPage.vue'),
        },
      ],
    },

    // Auth
    {
      path: '/auth',
      redirect: { name: 'login' }, // '/login'
      component: () => import('@/modules/auth/layouts/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/modules/auth/pages/LoginPage.vue'),
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/modules/auth/pages/RegisterPage.vue'),
        },
      ],
    },

    // Not Found
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: NotFoun404,
    },
  ],
});

export default router;
