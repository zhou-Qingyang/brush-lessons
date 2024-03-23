import { Col, Row, Input, Select, Space, Button, Flex, Tag, Table, Pagination } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { useEffect, useState } from 'react';
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { PriceList } from '@/api/price'
const Price = () => {
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '平台名称',
            dataIndex: 'name',
            key: 'name',
            align: 'center', // 将该列内容居中显示
        },
        {
            title: '平台网址',
            dataIndex: 'link',
            key: 'link',
            align: 'center', // 将该列内容居中显示
            render: text => <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>,
        },
        {
            title: '价格',
            dataIndex: 'rmb',
            key: 'rmb',
            align: 'center',
        },
        {
            title: '备注',
            dataIndex: 'msg',
            key: 'msg',
            align: 'center',
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleStudy(record)} style={{ padding: '5px 10px', background: 'lightcoral', color: 'white', borderRadius: '20px', textDecoration: 'none' }}>
                        前往学习
                    </a>
                </Space>
            ),
        },
    ];
    const [tableData, setTableData] = useState([])
    useEffect(() => {
        fetchPriceList()
    }, [])
    const fetchPriceList = async () => {
        const res = await PriceList()
        const newData = res.data.items_dict.map((item, index) => {
            return {
                ...item,
                key: item.id,
            }
        })
        setTableData(newData)
    }
    const handleStudy = () => {
        console.log('study')
    }

    return (
        <>
            <QueueAnim delay={500} type={['left', 'right']}>
                <Space
                    key={1}
                    direction="vertical"
                    size="large"
                    style={{
                        display: 'flex',
                    }}>
                    <Row></Row>
                    <Row>
                        <Table
                            style={{ width: '100%' }}
                            pagination={false}
                            columns={columns}
                            dataSource={tableData}
                        />
                    </Row>
                </Space>
            </QueueAnim>
        </>
    );
}
export default Price;