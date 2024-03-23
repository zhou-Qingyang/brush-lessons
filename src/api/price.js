import request from '@/utils/request.js'

export const PriceList = (data) => {
    return request({
        url: "user_item_rmb",
        method: "POST",
        data
    })
}
