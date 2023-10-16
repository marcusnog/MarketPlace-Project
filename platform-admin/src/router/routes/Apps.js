import { lazy } from 'react'

const AppRoutes = [
    {
        path: '/apps/partners',
        component: lazy(() => import('../../views/apps/partner/list'))
    },
    {
        path: '/apps/user',
        component: lazy(() => import('../../views/apps/user/list'))
    },
    {
        path: '/apps/campaign',
        component: lazy(() => import('../../views/apps/campaign/list'))
    },
    {
        path: '/apps/participant/:id',
        component: lazy(() => import('../../views/apps/participant/list')),
        meta: {
            navLink: '/apps/participant'
        }
    },
    // {
    //     path: '/apps/promotions',
    //     component: lazy(() => import('../../views/apps/promotions/list'))
    // },
    {
        path: '/apps/clients',
        component: lazy(() => import('../../views/apps/clients/list'))
    },
    {
        path: '/apps/twitter',
        component: lazy(() => import('../../views/apps/twitter/list'))
    },
    {
        path: '/apps/financeiro',
        component: lazy(() => import('../../views/apps/financeiro/list'))
    },
    {
        path: '/apps/extratoPontos',
        component: lazy(() => import('../../views/apps/extratoPontos/list'))
    }
]

export default AppRoutes
