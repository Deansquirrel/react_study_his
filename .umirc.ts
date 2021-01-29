import { defineConfig } from 'umi';
import routes from './src/router/index';

export default defineConfig({
  dynamicImport: {},
  // exportStatic: {
  //   htmlSuffix: true,
  //   dynamicRoot: true,
  // },
  nodeModulesTransform: {
    type: 'none',
  },
  title: 'Test App',
  links: [{ rel: 'icon', href: '/assets/favicon.ico' }],
  routes: routes,
  fastRefresh: {},
});
