export default {
  path: '/pageA',
  routes: [
    {
      path: '/pageA/pageAA',
      component: '@/pages/subPageA/subPageAA',
      exact: true,
    },
    {
      path: '/pageA/pageAB',
      component: '@/pages/subPageA/subPageAB',
      exact: true,
    },
  ],
};
