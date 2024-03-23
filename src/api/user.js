import request from '@/utils/request.js'

export const UserLogin = (data) => {
    return request({
        url: "user_login",
        method: "POST",
        data
    })
}
