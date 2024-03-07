import api from '@/shared/utils/api'

const baseUrl = '/login'

const login = async credentials => {
  const response = api.post(baseUrl, credentials)

  return response
}

export default { login }