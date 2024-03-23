import { Col, Row, Card, Space, Button } from 'antd';
import { TeamOutlined, UnorderedListOutlined, BugOutlined, DingtalkOutlined } from '@ant-design/icons';
import './index.scss';
import QueueAnim from 'rc-queue-anim';

const Index = () => {
    return (
        <>
            <QueueAnim type={['left', 'right']} duration={600}>
                <Space
                    key="1"
                    direction="vertical"
                    size="large"
                    style={{
                        display: 'flex',
                    }}
                >
                    <Row gutter={16}>
                        <Col span={6}>
                            <Card hoverable={true} key="1">
                                <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <span className='iconItem' >
                                            <UnorderedListOutlined style={{ fontSize: "48px" }} />
                                        </span>
                                    </div>
                                    <div>
                                        <h3>已完成</h3>
                                        <p style={{ fontSize: "16px" }}>88888</p>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card hoverable={true} key="1">
                                <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <span className='iconItem' >
                                            <DingtalkOutlined style={{ fontSize: "48px" }} />
                                        </span>
                                    </div>
                                    <div>
                                        <h3>进行中</h3>
                                        <p style={{ fontSize: "16px" }}>88888</p>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card hoverable={true} key="1">
                                <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <span className='iconItem' >
                                            <TeamOutlined style={{ fontSize: "48px" }} />
                                        </span>
                                    </div>
                                    <div>
                                        <h3>需要人工</h3>
                                        <p style={{ fontSize: "16px" }}>88888</p>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card hoverable={true} key="1">
                                <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <span className='iconItem' >
                                            <BugOutlined style={{ fontSize: "48px" }} />
                                        </span>
                                    </div>
                                    <div>
                                        <h3>异常</h3>
                                        <p style={{ fontSize: "16px" }}>88888</p>
                                    </div>
                                </div>
                            </Card>
                        </Col>

                    </Row>
                    <Row>
                        <Col span={24}>
                            <Card title="我的余额">
                                88888
                            </Card>
                        </Col>
                    </Row>
                </Space >
            </QueueAnim>
        </>
    );
}
export default Index;