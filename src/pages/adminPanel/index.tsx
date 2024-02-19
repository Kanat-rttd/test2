import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect, lazy, Suspense } from 'react'
import { NOTFOUND_ROUTE } from '../../utils/constants/routes.consts'
import Loading from '../../components/Loading'
import getUserInfo from '@/utils/helpers/getUserInfo'

const Products = lazy(() => import('./modules/Products'))
const Clients = lazy(() => import('./modules/Clients'))
const Users = lazy(() => import('./modules/Users'))

type PageType = 'user' | 'users' | 'clients' | 'products'

const AdminPanel = () => {
    const [content, setContent] = useState<JSX.Element | null>(null)
    const { page } = useParams<{ page: PageType }>()
    const navigate = useNavigate()

    //console.log(getUserInfo())

    const pagesMap: { [key in PageType]: JSX.Element } = {
        user: <div />,
        users: <Users />,
        clients: <Clients />,
        products: <Products />,
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
