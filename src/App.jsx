
import { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  WindowsFilled,
  FolderOpenFilled,
  CheckCircleFilled,
  SnippetsFilled,
  AlipaySquareFilled
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './app.scss';
import MyHeader from "@/components/Header"
const { Header, Sider, Content } = Layout;
const menus = [
  {
    key: 'index',
    icon: <WindowsFilled />,
    label: '首页',
  },
  {
    key: 'order',
    icon: <CheckCircleFilled />,
    label: '下单管理',
  },
  {
    key: 'trading',
    icon: <AlipaySquareFilled />,
    label: '交易订单',
  },
  {
    key: 'detail',
    icon: <FolderOpenFilled />,
    label: '资金明细',
  },
  {
    key: 'price-list',
    icon: <SnippetsFilled />,
    label: '价格表',
  },
];

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuHandle = ({ item, key, keyPath, domEvent }) => {
    setSelectedKeys([key]);
    navigate(`${key}`)
  };

  const [selectedKeys, setSelectedKeys] = useState(['']);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    const key = location.pathname.split('/')[1];
    let pageTitle = '';
    switch (key) {
      case 'index':
        pageTitle = '首页';
        break;
      case 'order':
        pageTitle = '下单管理';
        break;
      case 'trading':
        pageTitle = '交易订单';
        break;
      case 'detail':
        pageTitle = '资金明细';
        break;
      case 'price-list':
        pageTitle = '价格表';
        break;
    }
    const selectedKey = menus.find(menu => menu.key === key)?.key || '1'; // 根据路由路径找到对应的菜单项的 key，默认选中第一个菜单项
    setSelectedKeys([selectedKey]);
    document.title = '刷课系统--' + pageTitle;

    //添加面包屑
    setMessage(pageTitle)
    return () => {
      document.title = '刷课系统';
    };
  }, [location.pathname]);

  const [collapsed, setCollapsed] = useState(false);

  const handleMessageFromChild = (collapsed) => {
    setCollapsed(collapsed)
  }

  return (
    <>
      <Layout style={{ height: '100vh', overflow: 'hidden' }}>
        <Sider trigger={null} collapsible collapsed={collapsed} width={220} >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={selectedKeys}
            defaultSelectedKeys={['1']}
            items={menus}
            onSelect={menuHandle}
            style={{ lineHeight: '64px' }}
          />
        </Sider>
        <Layout>
          <MyHeader sendMessageToParent={handleMessageFromChild} messageFromParent={message} />
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              overflowY: 'scroll',
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout >
    </>
  );
};

export default App
