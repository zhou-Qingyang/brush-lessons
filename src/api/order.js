import request from '@/utils/request.js'


// 查询所有项目
export const ItemList = (data) => {
    return request({
        url: "user_item",
        method: "POST",
        data
    })
}

export const OrderDelete = (data) => {
    return request({
        url: "user_order_delete",
        method: "POST",
        data
    })
}
export const OrderReset = (data) => {
    return request({
        url: "user_order_reset",
        method: "POST",
        data
    })
}

export const OrderInfoList = (data) => {
    return request({
        url: "user_order",
        method: "POST",
        data
    })
}

export const OrderAdd = (data) => {
    return request({
        url: "user_order_add",
        method: "POST",
        data
    })
}
