import { User, Users, Package, ShoppingBag, Award, Twitter, CreditCard, FileText} from 'react-feather'

export default [
    {
        id: 'Parceiros',
        title: 'Parceiros',
        icon: <User size={20} />,
        navLink: '/apps/partners',
        action: 'show',
        resource: 'master resources'
    },
    {
        id: 'User',
        title: 'Usuarios',
        icon: <Users size={20} />,
        navLink: '/apps/user',
        action: '*',
        resource: '*'
    },
    {
        id: 'Campaign',
        title: 'Campanhas',
        icon: <Package size={20} />,
        navLink: '/apps/campaign',
        action: '*',
        resource: '*'
    },
    {
        id: 'Clients',
        title: 'Clientes',
        icon: <Award size={20} />,
        navLink: '/apps/clients',
        action: 'show',
        resource: 'master resources'
    },
    // {
    //     id: 'Promotions',
    //     title: 'Promoções',
    //     icon: <ShoppingBag size={20} />,
    //     navLink: '/apps/promotions',
    //     action: '*',
    //     resource: '*'
    // },
    {
        id: 'Compra De Pontos',
        title: 'Compra de Pontos',
        icon: <CreditCard size={20} />,
        navLink: '/apps/financeiro',
        action: '*',
        resource: '*'
    },

    {
        id: 'Extrato de Pontos',
        title: 'Extrato de Pontos',
        icon: <FileText size={20} />,
        navLink: '/apps/ExtratoPontos',
        action: '*',
        resource: '*'
    }
]
