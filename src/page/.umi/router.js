import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';


let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/",
    "component": require('../../layout').default,
    "routes": [
      {
        "path": "/",
        "component": require('../loginController').default,
        "exact": true
      },
      {
        "path": "/userlist",
        "component": require('../user/userListController').default,
        "exact": true
      },
      {
        "path": "/userinfo",
        "component": require('../user/userInfoController').default,
        "exact": true
      },
      {
        "path": "/authlist",
        "component": require('../auth/authListController').default,
        "exact": true
      },
      {
        "path": "/authinfo",
        "component": require('../auth/authInfoController').default,
        "exact": true
      },
      {
        "path": "/dashboard",
        "routes": [
          {
            "path": "/dashboard/analysis",
            "component": require('../Dashboard/Analysis').default,
            "exact": true
          },
          {
            "path": "/dashboard/monitor",
            "component": require('../Dashboard/Monitor').default,
            "exact": true
          },
          {
            "path": "/dashboard/workplace",
            "component": require('../Dashboard/Workplace').default,
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/guanxin/Documents/soso_opt/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/page', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "component": () => React.createElement(require('/Users/guanxin/Documents/soso_opt/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/page', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('/Users/guanxin/Documents/soso_opt/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/page', hasRoutesInConfig: true })
  }
];
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

export default function() {
  return (
    <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
  );
}
