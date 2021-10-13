import { ToyHome } from './pages/ToyHome'
import { ToyAbout } from './pages/ToyAbout'
import { ToyApp } from './pages/ToyApp'
import { ToyDetails } from './pages/ToyDetails'
import { ToyEdit } from './pages/ToyEdit'
import { ToyChart } from './cmps/ToyChart'
import { ToyLoginSignup } from './pages/ToyLoginSignup'
import { ToyUserDetails } from './pages/ToyUserDetails'
import { ToyReviews } from './pages/ToyReviews'
const routes = [
    {
        path: '/',
        component: ToyHome,
    },
    {
        path: '/toy',
        component: ToyApp,
    },
    {
        path: '/toy/details/:toyId',
        component: ToyDetails,
    },
    {
        path: '/toy/edit/:toyId',
        component: ToyEdit,
    },
    {
        path: '/about',
        component: ToyAbout,
    },
    {
        path: '/chart',
        component: ToyChart,
    },
    {
        path: '/login',
        component: ToyLoginSignup,
    },
    {
        path: '/user',
        component: ToyUserDetails,
    },
    {
        path: '/review',
        component: ToyReviews,
    }
]

export default routes;