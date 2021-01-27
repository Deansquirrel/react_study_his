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
  ],
};
