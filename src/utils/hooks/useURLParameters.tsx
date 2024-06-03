import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

/**
 * Custom hook using react-router-dom
 * @returns
 */
export function useURLParameters() {
    const [urlParams, setUrlParams] = useSearchParams()

    const getParam = (param: string) => {
        return urlParams.get(param) ?? ''
    }

    const getURLs = () => {
        return urlParams.toString()
    }

    const setParam = (param: string, value: string, replace: boolean = true) => {
        const newParams = new URLSearchParams(urlParams)
        newParams.delete(param)
        if (value) {
            newParams.set(param, value)
        }
        
        setUrlParams(newParams, { replace: replace })
    }

    const getAllParams = useMemo(() => {
        const params: { [key: string]: string | undefined } = {}
        for (const [key, value] of urlParams) {
            params[key] = value
        }
        return params
    }, [urlParams])

    const setParamObject = (paramsObject: { [key: string]: string | undefined }) => {
        const newParams = new URLSearchParams(urlParams)
        console.log('stated');
        
        for (const key in paramsObject) {
            const value = paramsObject[key]
            newParams.delete(key)
            if (value) {
                newParams.set(key, value)
            }
        }

        setUrlParams(newParams, { replace: true })
    }

    return { getParam, setParam, getAllParams, setParamObject, getURLs }
}
