import {lazy} from 'react'

const PagesRoutes = [
  {
    path: '/login',
    component: lazy(() => import('../../views/pages/authentication/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/demo-version',
    component: lazy(() => import('../../views/pages/version-demo/index')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },

  {
    path: '/termos-de-uso',
    component: lazy(() => import('../../views/pages/authentication/TermosDeUso')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },

  {
    path: '/forgot-password/recovery',
    component: lazy(() => import('../../views/pages/authentication/ResetPassword')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/forgot-password',
    component: lazy(() => import('../../views/pages/authentication/ForgotPassword')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/dashboard',
    component: lazy(() => import('../../views/dashboard')),
    exact: true
  }
]

export default PagesRoutes