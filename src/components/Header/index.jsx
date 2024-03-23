
import { Layout, Dropdown, Button, theme, Breadcrumb, Space } from 'antd';
const { Header, Sider, Content } = Layout;
import { useEffect, useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DownOutlined,
    FullscreenOutlined,
    FullscreenExitOutlined,

} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const MyHeader = ({ sendMessageToParent, messageFromParent }) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [collapsed, setCollapsed] = useState(false);

    const navigator = useNavigate();

    const handleClick = () => {
        setCollapsed(!collapsed);
        sendMessageToParent(!collapsed)
    };

    const [items, setItems] = useState([
        {
            title: <a href="index">首页</a>,
        },
    ]);

    const handleLogOut = () => {
        localStorage.clear()
        window.location.reload()
    }
    const [dropItems, setDropItems] = useState([
        {
            label: <a href="/index">首页</a>,
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: <a onClick={handleLogOut}>退出登录</a>,
            key: '1',
        },
    ]);

    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleFullscreen = () => {
        if (!isFullscreen) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
        setIsFullscreen(!isFullscreen);
    };

    useEffect(() => {
        if (messageFromParent === '首页') {
            setItems([
                {
                    title: <a href="index">首页</a>,
                },
            ]);
        } else {
            setItems((prevItems) => [
                prevItems[0],
                { title: messageFromParent }
            ]);
        }
    }, [messageFromParent]);

    return (
        <Header
            style={{
                padding: 0,
                background: colorBgContainer,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <div style={{ flex: "1", display: "flex", alignItems: 'center', }}>
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={handleClick}
                    style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                    }}
                />
                <Breadcrumb
                    items={items}
                />
                {
                    isFullscreen ? (
                        <FullscreenExitOutlined
                            style={{ marginLeft: "auto", marginRight: "15px", fontSize: "24px" }}
                            onClick={() => handleFullscreen()}
                        />
                    ) : (
                        <FullscreenOutlined
                            style={{ marginLeft: "auto", marginRight: "15px", fontSize: "24px" }}
                            onClick={() => handleFullscreen()}
                        />
                    )
                }
            </div>

            <Dropdown
                menu={{
                    items: dropItems,
                }}
                trigger={['click']}
                style={{ marginLeft: 'auto' }}
            >
                <a onClick={(e) => e.preventDefault()} style={{ marginRight: '20px' }}>
                    <Space>
                        csgotemplate
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </Header>
    )
}
export default MyHeader;