import { defineConfig } from 'umi';
import routes from './src/router/root';

export default defineConfig({
  mock: {},
  fastRefresh: {},
  // proxy: {
  //   '/api': {
  //     target: 'http://119.3.122.149:9050/',
  //     changeOrigin: true,
  //   },
  // },
});
