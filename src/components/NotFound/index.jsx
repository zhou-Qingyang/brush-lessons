import React, { useState, useEffect } from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    const [second, setSeconds] = useState(10)
    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prevSecond => { return prevSecond - 1 })
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    useEffect(() => {
        if (second === 0) {
            navigate("/index")
        }
    }, [second])

    const backHone = () => {
        navigate("/index")
    }
    return (
        <Result
            status="404"
            title="404"
            style={{ marginTop: "80px" }}
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={backHone}>
                返回首页 ({second}S)
            </Button>}
        />
    )
}

export default NotFound;