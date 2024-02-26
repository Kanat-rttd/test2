import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect, lazy, Suspense } from 'react'
import { NOTFOUND_ROUTE } from '../../utils/constants/routes.consts'
import Loading from '../../components/Loading'

const Products = lazy(() => import('./modules/Products'))
const Users = lazy(() => import('./modules/Users'))
const Releases = lazy(() => import('./modules/Release'))
const UniquePrice = lazy(() => import('./modules/UniquePrice'))

type PageType = 'user' | 'users' | 'products' | 'releases' | 'uniquePrice'

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
