import axios from 'axios'
import { Modal, message } from 'antd';
const request = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_PATH}:${import.meta.env.VITE_CLI_PORT}${import.meta.env.VITE_BASE_API}`,
    timeout: 5000,
});

request.interceptors.request.use(
    (config) => {
        config.headers = {
            'nmsl': localStorage.getItem('token'),
            ...config.headers
        }
        return config;
    },
    (error) => {
        message.error(error)
        return error;
    }
);

request.interceptors.response.use(
    (response) => {
        if (response.data.code === 200 || response.headers.success === 'true') {
            if (response.headers.msg) {
                response.data.msg = decodeURI(response.headers.msg)
            }
            return response.data
        } else {
            let mesText = response.data.msg || decodeURI(response.headers.msg)
            message.error(mesText)
            return response.data.msg ? response.data : response
        }
    },
    (error) => {
        if (!error.response) {
            message.error('检测到请求错误' + error);
            return;
        }
        switch (error.response.status) {
            case 500:
                Modal.info({
                    content: (
                        `检测到接口错误`
                        + error
                        + ` 错误码 500 ：此类错误内容常见于后台panic，请先查看后台日志，如果影响您正常使用可强制登出清理缓存`

                    ),
                    okText: '清理缓存',
                    cancelText: '取消',
                    onOk() {
                    }
                });
                break;
            case 404:
                Modal.info({
                    content: (
                        "检测到接口错误"
                        + error
                        + "错误码 404 ：此类错误内容常见于用户请求的URL地址不存在、页面已被删除、链接失效等原因导致的"
                    ),
                    okText: '清理缓存',
                    cancelText: '取消',
                    onOk() {
                    }
                });
        }
        return error.response.data || error.response.headers.msg;
    }
);

export default request;