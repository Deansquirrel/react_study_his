import { defineConfig } from 'umi';
import routes from './src/router/root';

export default defineConfig({
  fastRefresh: {},
  routes: [{ path: '/', component: '@/pages/index' }],
});
