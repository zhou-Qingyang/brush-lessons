import { Col, Row, Input, Select, Space, Button, Flex, Tag, Table, Pagination } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { useEffect, useState } from 'react';
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { FundsList } from '@/api/funds'
const Detail = () => {
    const columns = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '时间',
            dataIndex: 'creation_time',
            key: 'creation_time',
        },
        {
            title: '变动金额',
            dataIndex: 'rmb',
            key: 'rmb',
        },
        {
            title: '账户余额',
            dataIndex: 'balance',
            key: 'balance',
        },
        {
            title: '变动类型',
            dataIndex: 'change_type',
            key: 'change_type',
            render: (_, record) => {
                return record.change_type == 1 ? <Tag color='#2db7f5' key={record.change_type}>增加</Tag> : <Tag color='#f50' key={record.change_type}>扣除</Tag>;
            },
        },
        {
            title: '状态',
            dataIndex: 'state',
            render: (_, record) => {
                switch (record.state) {
                    case 0:
                        return <Tag color='#2db7f5' key={record.state}>已下单</Tag>;
                    case 1:
                        return <Tag color='#87d068' key={record.state}>费用返还</Tag>;
                    case 2:
                        return <Tag color='#108ee9' key={record.state}>充值</Tag>;
                    default:
                        return <Tag key={record.state}>{record.notes}</Tag>;
                }
            },
        },
        {
            title: '备注',
            dataIndex: 'notes',
            key: 'notes',
        },
    ];

    useEffect(() => {
        fetchFundsList()
    }, [])

    const [search, setSearch] = useState({
        page: 1,
        limit: 10,
    })
    const [total, setTotal] = useState(3)
    const fetchFundsList = async () => {
        let res = await FundsList(search)
        const newData = res.data.funds_dict.map((item, index) => {
            return {
                ...item,
                key: item.id,
            }
        })
        setTableData(newData)
        setTotal(res.data.total)
    }

    const handlePage = (page, pageSize) => {
        setSearch({
            ...search,
            page: page,
            limit: pageSize
        })
    }
    useEffect(() => {
        fetchFundsList()
    }, [search])

    const [tableData, setTableData] = useState([])
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
                    <Row>
                        <Table
                            style={{ width: '100%' }}
                            pagination={false}
                            columns={columns}
                            dataSource={tableData}
                        />
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Pagination showTotal={(total) => `Total ${total} items`} defaultCurrent={search.page} defaultPageSize={search.limit} total={total} onChange={handlePage} />
                        </Col>
                    </Row>
                </Space>
            </QueueAnim>
        </>
    );
}
export default Detail;