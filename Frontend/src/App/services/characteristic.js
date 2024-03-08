import api from '@/shared/utils/api'

const baseUrl = '/characteristic'

export const getCharacteristicList = async () => {
    const characteristics = api.get(baseUrl)
    return characteristics
}

export const createCharacteristic = async (characteristic) => {
    const createdCharacteristic = api.post(baseUrl, characteristic)
    return createdCharacteristic
}

export const getCharacteristicById = async (characteristic_id) => {
    const characteristic = api.get(`${baseUrl}/${characteristic_id}`)
    return characteristic
}

export const deleteCharacteristic = async (characteristic_id) => {
    api.delete(`${baseUrl}/${characteristic_id}`)
}