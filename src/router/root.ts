export default {
  path: '/',
  component: '@/layouts/Common',
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: '@/pages/login',
      exact: true,
    },
    {
      path: '/welcome',
      component: '@/pages/welcome',
      wrappers: ['@/wrappers/auth'],
      exact: true,
    },
    {
      path: '*',
      component: '@/pages/404',
      exact: false,
    },
  ],
};
