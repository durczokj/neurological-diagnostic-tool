import api from '@/shared/utils/api'

const baseUrl = '/characteristic'

export default const getCharacteristicList = async () => {
    const characteristics = api.get(baseUrl)
    return characteristics
}

export default const createCharacteristic = async characteristic => {
    const characteristic = api.post(baseUrl, characteristic)
    return characteristic
}

export default const getCharacteristicById = async characteristic_id => {
    const characteristic = api.get(`${baseUrl}/${characteristic_id}`)
    return characteristic
}

export default const deleteCharacteristic = async characteristic_id => {
    api.delete(`${baseUrl}/${characteristic_id}`)
}