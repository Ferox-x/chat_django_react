import { axiosInstance } from '../../../axios/axios_config'

export class CreateChatApi {
    static getRooms = () => {
        return axiosInstance.get('v1/chats/').then((response) => {
            return response.data
        })
    }
}
