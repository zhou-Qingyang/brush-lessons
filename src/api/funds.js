import request from '@/utils/request'

export const FundsList = (data) => {
    return request({
        url: "user_funds",
        method: "POST",
        data
    })
}


