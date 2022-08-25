/* eslint-disable react/no-array-index-key */
import React, {
  lazy,
  Suspense,
  Fragment
} from 'react';
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import LoadingScreen from 'src/components/LoadingScreen';

const routesConfig = [
  {
    exact: true,
    path: '/',
    component: () => <Redirect to="/home" />
  },
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('src/views/pages/Error404View'))
  },
  {
    path: '/app',
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: '/app/management/corrales',
        component: lazy(() => import('src/views/management/CorralListView'))
      },
      {
        exact: true,
        path: '/app/management/corrales/animales',
        component: lazy(() => import('src/views/management/CorralAnimalListView'))
      },
      {
        exact: true,
        path: '/app/management/corrales/:corralId/editar',
        component: lazy(() => import('src/views/management/CorralEditView'))
      },
      {
        exact: true,
        path: '/app/management/corrales/create',
        component: lazy(() => import('src/views/management/CorralCreateView'))
      },
      {
        exact: true,
        path: '/app/management/animales',
        component: lazy(() => import('src/views/management/AnimalListView'))
      },
      {
        exact: true,
        path: '/app/management/animales/:animalId/editar',
        component: lazy(() => import('src/views/management/AnimalEditView'))
      },
      {
        exact: true,
        path: '/app/management/animales/create',
        component: lazy(() => import('src/views/management/AnimalCreateView'))
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  },
  {
    path: '*',
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: '/home',
        component: lazy(() => import('src/views/management/CorralListView'))
      }
    ]
  }
];

const renderRoutes = (routes) => (routes ? (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes
                    ? renderRoutes(route.routes)
                    : <Component {...props} />}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
) : null);

function Routes() {
  return renderRoutes(routesConfig);
}

export default Routes;
