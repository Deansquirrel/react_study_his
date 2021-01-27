import { history } from 'umi';

export function render(oldRender: () => void) {
  // 用于渲染之前做权限校验
  //   fetch('/api/auth').then(auth => {
  //     if (auth.isLogin) { oldRender() }
  //     else {
  //       history.push('/login');
  //       oldRender()
  //     }
  //   });
  oldRender();
}

// export function onRouteChange({ location, routes, action }) {
//   bacon(location.pathname);
// }

// export function onRouteChange({ matchedRoutes }) {
//   if (matchedRoutes.length) {
//     document.title = matchedRoutes[matchedRoutes.length - 1].route.title || '';
//   }
// }
