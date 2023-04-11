import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import PageLoading from '@/components/PageLoading';
import RouteConfig from './RouterConfig';

export default class RouterGenerator {
  static genRouter() {
    const routers = RouterGenerator.getRouters(RouteConfig);
    return (
      <Switch>
        {routers.map((route) => {
          return <Route key={route.path} path={route.path} exact={route.exact} component={route.main} />;
        })}
        <Redirect from="/" to="/home" />
        <Redirect to="/error" />
      </Switch>
    );
  }

  static routers = null;

  static getRouters(routerConf) {
    if (!RouterGenerator.routers) {
      RouterGenerator.routers = routerConf.map((router) => {
        return {
          path: router.path,
          exact: router.exact,
          main: Loadable({
            loader: () => {
              return router.page() || <PageLoading />;
            },
            loading: (props) => {
              /* eslint-disable */
              if (props.error) {
                window.console.error(props.error);
              }
              /* eslint-disable */
              return <PageLoading />;
            },
            render(loaded, props) {
              const Component = loaded.default;
              return <Component {...props} />;
            },
          }),
        };
      });
    }
    return RouterGenerator.routers;
  }
}
