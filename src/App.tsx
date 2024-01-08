import { Navigate, Routes, Route, useNavigate } from 'react-router-dom'
import { protectedRoutes, publicRoutes } from './utils/AppRouter'
import { Suspense, useEffect, useState } from 'react'
import { NOTFOUND_ROUTE } from './utils/constants/routes.consts'

function App() {
    const navigate = useNavigate()
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
