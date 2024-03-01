import axios from 'axios'

import { getStoredAuthToken, removeStoredAuthToken } from './authToken'
import history from '@/browserHistory'

const defaultParams = {
    baseUrl: 'http://localhost:5001',
    headers: () => ({
        'Content-Type': 'application/x-www-form-urlencoded'
    })
}

const formData = new URLSearchParams()

const api = (method, url, variables) => {
    for (const property in variables) {
        formData.append(property, variables[property])
    }
    new Promise((resolve, reject) => {
        axios({
            url: `${defaultParams.baseUrl}${url}`,
            method,
            headers: defaultParams.headers(),
            params: method === 'get' ? variables : undefined,
            data: method !== 'get' ? formData : undefined
        }).then(
            response => {
                resolve(response.data)
            },
            error => {
                if (error.response) {
                    if (error.response.data.error.code === 'INVALID_TOKEN') {
                        removeStoredAuthToken()
                        history.pushState('/login')
                    } else {
                        reject(error.response.data.error);
                    }
                } else {
                    reject(defaultParams.error);
                }
            }
        )
    })
}

export default {
    get: (...args) => api('get', ...args),
    post: (...args) => api('post', ...args),
    put: (...args) => api('put', ...args),
    patch: (...args) => api('patch', ...args),
    delete: (...args) => api('delete', ...args)
}