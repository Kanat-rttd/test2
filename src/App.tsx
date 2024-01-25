import { Navigate, Routes, Route } from 'react-router-dom'
import { publicRoutes } from './utils/AppRouter'
import { Suspense, useEffect } from 'react'
import { LOGIN_ROUTE, NOTFOUND_ROUTE } from './utils/constants/routes.consts'
import { useNavigate } from 'react-router-dom'
import { auth } from './utils/services/user.service'
import { useToast } from '@chakra-ui/react'
import getUserInfo from './utils/helpers/getUserInfo'

function App() {
    const navigate = useNavigate()
    const toast = useToast()

    console.log(getUserInfo())

    useEffect(() => {
        auth()
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                toast({
                    title: 'Ошибка авторизаций.',
                    description: err.response.data.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
                navigate(LOGIN_ROUTE)
            })
    }, [])
    return (
        <Routes>
            {publicRoutes.map(({ path, Component, Loader }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        <Suspense fallback={<Loader />}>
                            <Component />
                        </Suspense>
                    }
                />
            ))}
            <Route path="*" element={<Navigate to={NOTFOUND_ROUTE} replace />} />
        </Routes>
    )
}

export default App
