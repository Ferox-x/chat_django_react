import { axiosInstance } from '../../../../axios/axios_config'

export class RoomChatApi {
    static getMe = () => {
        return axiosInstance.get('v1/users/me').then((response) => {
            return response.data.id
        })
    }

    static getMessages = (roomName) => {
        return axiosInstance
            .get('v1/chats/' + roomName + '/')
            .then((response) => {
                return response.data
            })
    }
}
