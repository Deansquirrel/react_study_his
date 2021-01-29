import { defineConfig } from 'umi';
import routes from './src/router/root';

export default defineConfig({
  mock: false,
  fastRefresh: {},
  routes: [{ path: '/', component: '@/pages/index' }],
});
