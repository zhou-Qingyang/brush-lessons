import { Col, Row, Input, Select, Space, Button, Flex, Tag, Table, Pagination, message, Modal } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { useEffect, useState } from 'react';
import { DownloadOutlined, SearchOutlined } from '@ant-design/icons';
import { ItemList, OrderInfoList, OrderReset, OrderDelete } from '@/api/order'
const { TextArea } = Input;

const Trading = () => {
    const showDeleteConfirm = (record) => {
        Modal.confirm({
            title: '确认删除',
            content: `确定要删除序号为 ${record.id} 吗？`,
            onOk() {
                handleDelete(record);
            },
            onCancel() {
            },
        });
    };

    const showResetConfirm = (record) => {
        Modal.confirm({
            title: '确认重置',
            content: `确定要重置序号为 ${record.id} 吗？`,
            onOk() {
                handleReset(record);
            },
            onCancel() {
            },
        });
    };

    const handleReset = async (record) => {
        console.log(record)
        let res = await OrderReset({ order_id: record.id })
        if (res.code === 200) {
            message.success('重置成功');
            fetchOrderInfoList()
        }
    }

    const handleDelete = async (record) => {
        console.log(record)
        let res = await OrderDelete({ order_id: record.id })
        if (res.code === 200) {
            message.success('删除成功');
            fetchOrderInfoList()
        }
    }

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '网站',
            dataIndex: 'item_name',
            key: 'item_name',
        },
        {
            title: '账号',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '密码',
            dataIndex: 'password',
            key: 'password',
            render: (_, record) => (
                <>
                    <Tag key={record.password}>
                        {record.password}
                    </Tag>
                </>
            ),
        },
        {
            title: '进度说明',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            render: (_, record) => {
                switch (record.state) {
                    case 0:
                        return <Tag color='#2db7f5' key={record.state}>已下单</Tag>;
                    case 1:
                        return <Tag color='#87d068' key={record.state}>进行中</Tag>;
                    case 2:
                        return <Tag color='#108ee9' key={record.state}>已完成</Tag>;
                    case 3:
                        return <Tag color='#f50' key={record.state}>需人工</Tag>;
                    case 4:
                        return <Tag color='#f50' key={record.state}>已退款</Tag>;
                    default:
                        return <Tag key={record.state}>{record.notes}</Tag>;
                }
            },
        },
        {
            title: '上传时间',
            dataIndex: 'creation_time',
            key: 'creation_time',
        },
        {
            title: '完成时间',
            dataIndex: 'complete_time',
            key: 'complete_time',
        },
        {
            title: '备注',
            dataIndex: 'notes',
            key: 'notes',
            render: (_, record) => (
                <>
                    <Tag color='#2db7f5' key={record.notes}>
                        {record.notes}
                    </Tag>
                </>
            ),
        },
        {
            title: '订单操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => showResetConfirm(record)}>重置</Button>
                    <Button type="primary" danger onClick={() => showDeleteConfirm(record)}>删除</Button>
                </Space>
            ),
        },
    ];
    useEffect(() => {
        fetchItemList()
    }, [])

    const fetchOrderInfoList = async () => {
        let res = await OrderInfoList(search);
        if (res.code == 200) {
            setTotal(res.data.total)
            const newData = res.data.orders_dict.map((item, index) => {
                return {
                    ...item,
                    key: item.id,
                }
            })
            setTableData(newData)
        }
    }
    const [orderOptions, setOrderOptions] = useState([]);
    const [total, setTotal] = useState(5)
    const fetchItemList = async () => {
        const res = await ItemList();
        let options = res.data.items_dict.map(item => {
            const { id, name, rmb, msg } = item
            return {
                key: id,
                value: id,
                label: name,
                rmb,
                msg
            }
        })
        setOrderOptions(options)
    }
    const [search, setSearch] = useState({
        page: 1,
        limit: 10,
        item_id: undefined,
        username: "",
        state: ''
    })
    const [tableData, setTableData] = useState([])

    const statusOption = [
        {
            label: "已下单",
            value: 0
        },
        {
            label: "进行中",
            value: 1
        },
        {
            label: "已完成",
            value: 2
        },
        {
            label: "需要人工",
            value: 3
        },
        {
            label: "已退款",
            value: 4
        },
    ]

    const handleInput = (e) => {
        setSearch({
            ...search,
            username: e.target.value
        })
    }
    const handleSelectChange = (value, tag) => {
        setSearch({
            ...search,
            [tag]: value
        })
    }

    const clickSearch = () => {
        console.log(search)
        fetchOrderInfoList()
    }

    const handlePage = (page, pageSize) => {
        setSearch({
            ...search,
            page,
            limit: pageSize
        })
    }

    useEffect(() => {
        fetchOrderInfoList();
    }, [search]);

    return (
        <>
            <QueueAnim delay={500} type={['left', 'right']}>
                <Space
                    key={1}
                    direction="vertical"
                    size="large"
                    style={{
                        display: 'flex',
                    }}
                >
                    <Row gutter={16}>
                        <Col span={6}>
                            <Select
                                placeholder="请选择订单"
                                style={{ width: '100%' }}
                                options={orderOptions}
                                onChange={e => handleSelectChange(e, "item_id")}
                                value={search.item_id}
                            />
                        </Col>
                        <Col span={6}>
                            <Input placeholder="请输入账号信息" value={search.username} onChange={handleInput} />
                        </Col>
                        <Col span={6}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="请选择状态"
                                onChange={e => handleSelectChange(e, "state")}
                                options={statusOption}
                                value={search.state}
                            />
                        </Col>
                        <Col span={6}>
                            <Flex gap="small" vertical>
                                <Flex wrap="wrap" gap="small">
                                    <Button type="primary" icon={<SearchOutlined />} onClick={clickSearch}>
                                        搜索
                                    </Button>
                                    <Button type="primary" icon={<DownloadOutlined />} >
                                        导出
                                    </Button>
                                    <Button type="primary" danger>
                                        删除
                                    </Button>
                                </Flex>
                            </Flex>
                        </Col>
                    </Row>
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

export default Trading;