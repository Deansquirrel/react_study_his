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

// interface Location {
//   pathname: string,
// }

// export function onRouteChange({ location, routes, action }:
// { location: Location, routes: Array<any>, action: any }) {

// if (flag || excludePath.indexOf(location.pathname) < 0) {
//   history.push("/login");
// }
// }

// export function onRouteChange({ matchedRoutes }) {
//   if (matchedRoutes.length) {
//     document.title = matchedRoutes[matchedRoutes.length - 1].route.title || '';
//   }
// }
