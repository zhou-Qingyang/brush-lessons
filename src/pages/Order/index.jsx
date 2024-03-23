import { Col, Row, Select, Space, Button, Alert, Form, Card, Input, message } from 'antd';
import { useEffect, useState } from 'react';
import QueueAnim from 'rc-queue-anim';
import { ItemList, OrderAdd } from '@/api/order'
const { TextArea } = Input;
const Order = () => {
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        let { accounts, website } = values;
        const data = accounts.split('\n').map(item => {
            const [username, password] = item.split(' ');
            return { username, password };
        });
        let res = await OrderAdd({ item_id: website, user_list: data })
        if (res.code === 200) {
            form.resetFields();
            setSelected(false);
            message.success('加入订单成功');
        }
    };
    const [selected, setSelected] = useState(false);
    const [orderOptions, setOrderOptions] = useState([]);
    const [orderDetail, setOrderDetail] = useState({
        id: '',
        label: '',
        rmb: '',
        msg: ''
    });

    const fetchItemListList = async () => {
        const res = await ItemList();
        let options = res.data.items_dict.map(item => {
            const { id, name, rmb, msg } = item
            return {
                value: id,
                label: name,
                rmb,
                msg
            }
        })
        setOrderOptions(options)
    }

    useEffect(() => {
        fetchItemListList()
    }, [])

    const handleChange = (value) => {
        setSelected(true);
        let item = orderOptions.filter(item => item.value === value)
        setOrderDetail(item[0])
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
                    }}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Alert
                                message="下单信息"
                                description="请您按照下单须知进行操作，遇到问题请联系客服"
                                type="info"
                                showIcon
                            />


                        </Col>
                        <Col span={12}>
                            <Alert
                                message="课程信息"
                                description="只有少部分特殊的课程才需要查询 账号下课程 进行下单哦，其他课程直接加入订单即可"
                                type="success"
                                showIcon
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form
                                form={form}
                                name="control-hooks"
                                onFinish={onFinish}
                                style={{ width: '100%' }}
                            >
                                <Form.Item
                                    name="website"
                                    label="选择网站"
                                    rules={[
                                        {
                                            required: true,
                                            message: "请选择要下单的网站"
                                        },
                                    ]}
                                >
                                    <Select
                                        onChange={handleChange}
                                        options={orderOptions}
                                    />
                                </Form.Item>
                                {
                                    selected && (
                                        <Form.Item
                                            label="订单详细"
                                        >
                                            <Card
                                                title={orderDetail.label}
                                                style={{
                                                    width: 300,
                                                }}
                                            >
                                                <h3>价格:{orderDetail.rmb}</h3>
                                                <p>提示:{orderDetail.msg}</p>
                                            </Card>
                                        </Form.Item>
                                    )
                                }
                                {/* 值得学习的组件封装 */}
                                {/* <Form.List name="user_list">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map((field, index) => (
                                                <Row key={field.key} gutter={16}>
                                                    <Col span={10}>
                                                        <Form.Item
                                                            label={`账户 #${index + 1}`}
                                                            name={[field.name, 'username']}
                                                            fieldKey={[field.fieldKey, 'username']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: '请输入账户',
                                                                },
                                                            ]}
                                                        >
                                                            <Input />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={10}>
                                                        <Form.Item
                                                            label={`密码 #${index + 1}`}
                                                            name={[field.name, 'password']}
                                                            fieldKey={[field.fieldKey, 'password']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: '请输入密码',
                                                                },
                                                            ]}
                                                        >
                                                            <Input.Password />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={4}>
                                                        <Button type="danger" onClick={() => remove(field.name)}>删除账户</Button>
                                                    </Col>
                                                </Row>
                                            ))}
                                            <Form.Item>
                                                <Row justify="end">
                                                    <Button type="default" onClick={() => add()}>添加账户</Button>
                                                </Row>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List> */}
                                <Form.Item
                                    name="accounts"
                                    label="账户信息">
                                    <TextArea rows={20} />
                                </Form.Item>
                                <Form.Item>
                                    <Row justify="start"> {/* 将“提交”按钮放到右边 */}
                                        <Button type="primary" htmlType="submit">加入订单</Button>
                                    </Row>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Space>
            </QueueAnim>
        </>
    );
}
export default Order;