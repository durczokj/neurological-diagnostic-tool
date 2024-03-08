export const getStoredAuthToken = () => window.localStorage.getItem('loggedTasklyAppUser')

export const storeAuthToken = token => window.localStorage.setItem('loggedTasklyAppUser', token)

export const removeStoredAuthToken = () => localStorage.removeItem('loggedTasklyAppUser')
