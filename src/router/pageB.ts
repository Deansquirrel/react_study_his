export default {
  path: '/pageB',
  routes: [
    {
      path: '/pageB/pageBA',
      component: '@/pages/subPageB/subPageBA',
      exact: true,
    },
    {
      path: '/pageB/pageBB',
      component: '@/pages/subPageB/subPageBB',
      exact: true,
    },
  ],
};
