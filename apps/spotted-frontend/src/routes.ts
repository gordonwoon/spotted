// routes.ts
import { RouteDefinition, useRoutes } from '@solidjs/router';
import { lazy } from 'solid-js';

export type RouteProps = RouteDefinition & {
  label: string;
};

const routes: RouteProps[] = [
  {
    path: '/',
    label: 'Home',
    component: lazy(() => import('./pages/home/home')),
  },
  {
    path: '/selector-tracking',
    label: 'Selector Tracking',
    component: lazy(() => import('./pages/tracking/tracking')),
  },
  {
    path: '/subscription',
    label: 'Subscription',
    component: lazy(() => import('./pages/subscription/subscription')),
  },
  {
    path: '/login',
    label: 'Login',
    component: lazy(() => import('./pages/login/login')),
  },
  {
    path: '/register',
    label: 'Register',
    component: lazy(() => import('./pages/register/register')),
  },
];

export default routes;
