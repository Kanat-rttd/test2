import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect, Suspense, lazy } from 'react'
import { NOTFOUND_ROUTE } from '../../utils/constants/routes.consts'
import Loading from '../../components/Loading'

const BreadView = lazy(() => import('./modules/BreadView'))
const ReleaseView = lazy(() => import('./modules/ReleaseView'))
const VisitView = lazy(() => import('./modules/VisitView'))
const ReconciliationView = lazy(() => import('./modules/ReconciliationView'))

type PageType = 'visitView' | 'reconciliationView' | 'breadView' | 'releaseView'

const ReleasePage = () => {
    const [content, setContent] = useState<JSX.Element | null>(null)
    const { page } = useParams<{ page: PageType }>()
    const navigate = useNavigate()

    const pagesMap: { [key in PageType]: JSX.Element } = {
        visitView: <VisitView />,
        reconciliationView: <ReconciliationView />,
        releaseView: <ReleaseView />,
        breadView: <BreadView />,
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

export default ReleasePage
