import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect, lazy, Suspense } from 'react'
import { NOTFOUND_ROUTE } from '../../utils/constants/routes.consts'
import Loading from '../../components/Loading'
// import AdminProvider from './modules/Provider'

const Products = lazy(() => import('./modules/Products'))
const Users = lazy(() => import('./modules/Users'))
const Releases = lazy(() => import('./modules/Release'))
const UniquePrice = lazy(() => import('./modules/UniquePrice'))
const Magazines = lazy(() => import('./modules/Magazines'))
const Overprice = lazy(() => import('./modules/Overprice'))
const Provider = lazy(() => import('./modules/Provider'))

type PageType =
    | 'user'
    | 'users'
    | 'products'
    | 'releases'
    | 'uniquePrice'
    | 'magazines'
    | 'overprice'
    | 'provider'

const AdminPanel = () => {
    const [content, setContent] = useState<JSX.Element | null>(null)
    const { page } = useParams<{ page: PageType }>()
    const navigate = useNavigate()

    const pagesMap: { [key in PageType]: JSX.Element } = {
        user: <div />,
        users: <Users />,
        products: <Products />,
        releases: <Releases />,
        uniquePrice: <UniquePrice />,
        provider: <Provider />,
        magazines: <Magazines />,
        overprice: <Overprice />,
    }

    useEffect(() => {
        if (page && pagesMap[page]) {
            setContent(pagesMap[page])
        } else {
            navigate(NOTFOUND_ROUTE)
        }
    }, [page, navigate])

    return <Suspense fallback={<Loading />}>{content}</Suspense>
}

export default AdminPanel
