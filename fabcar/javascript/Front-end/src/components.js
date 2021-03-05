import React, { useState } from 'react';
import {
    Row,
    Col,
    Form,
    Input,
    Button,
    notification
  } from 'antd';
  import {
    MinusCircleOutlined,
    PlusOutlined
  } from '@ant-design/icons';

export const CreateModel = () => {
    const [form] = Form.useForm();

    const onFinish = values => {
        fetch('http://localhost:5003/createModel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(values)
        })
        .then(res => res.json())
        .then(data => {
            notification['success']({
                message: 'Transaction submitted'
            });
        })
        .catch(error => {
            notification['error']({
                message: 'Unable to submit transaction'
            });
        });
    }

    return (
        <>
            <Form
                form={form}
                layout="vertical"
                className="add-model-form"
                onFinish={onFinish}
            >
                <Form.Item
                    name="ModelId"
                    label="Model Id"
                    rules={[
                    {
                        required: true
                    }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="ModelName"
                    label="Model Name"
                    rules={[
                    {
                        required: true
                    }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="OrgId"
                    label="Organisation Id"
                    rules={[
                    {
                        required: true
                    }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="ProjId"
                    label="Project Id"
                    rules={[
                    {
                        required: true
                    }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.List
                    name="PrescribedComponentList"
                >
                    {(fields, {add, remove}) => {
                    return (
                        <>
                        {fields.map((field, index) => (
                            <Row key={field.key}>
                            <Col>
                                <Form.Item
                                name={[field.name, "PCId"]}
                                fieldKey={[field.fieldKey, "PCId"]}
                                >
                                <Input placeholder="PC Id" />
                                </Form.Item>
                            </Col>

                            <Col>
                                <Form.Item
                                name={[field.name, "PCName"]}
                                fieldKey={[field.fieldKey, "PCName"]}
                                >
                                <Input placeholder="PC Name" />
                                </Form.Item>
                            </Col>

                            <Col>
                                <Form.Item
                                name={[field.name, "CompId"]}
                                fieldKey={[field.fieldKey, "CompId"]}
                                >
                                <Input placeholder="Component Id" />
                                </Form.Item>
                            </Col>

                            <Col flex="none">
                                <MinusCircleOutlined
                                className="dynamic-delete-button"
                                onClick={() => {
                                    remove(field.name);
                                }}
                                />
                            </Col>
                            </Row>
                        ))}
                        <Form.Item>
                            <Button
                            type="dashed"
                            onClick={() => {
                                add();
                            }}
                            style={{ width: "100%" }}
                            >
                            <PlusOutlined /> Add Prescribed Component
                            </Button>
                        </Form.Item>
                        </>
                    )
                    }}
                </Form.List>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export const AddPCtoModel = () => {
    const [form] = Form.useForm();
    
    const onFinish = values => {
        fetch('http://localhost:5000/addPCtoModel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        .then(res => res.json())
        .then(data => {
            notification['success']({
                message: 'Transaction submitted'
            });
        })
        .catch(error => {
            notification['error']({
                message: 'Unable to submit transaction'
            });
        });
    }

    return (
        <>
            <Form
                form={form}
                layout="vertical"
                className="add-pc-model-form"
                onFinish={onFinish}
            >
                <Form.Item
                    name="ModelId"
                    label="Model Id"
                    rules={[
                    {
                        required: true
                    }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="CompId"
                    label="Component Id"
                    rules={[
                    {
                        required: true
                    }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="PCName"
                    label="Component Name"
                    rules={[
                    {
                        required: true
                    }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="PCId"
                    label="PC Id"
                    rules={[
                    {
                        required: true
                    }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export const QueryModel = () => {
    const [form] = Form.useForm();
    const [result, setResult] = useState('');

    const onFinish = values => {
        let id = values['ModelId'];
        fetch(`http://localhost:5000/queryModel?ModelId=${id}`)
        .then(res => res.json())
        .then(data => {
            setResult(data['result']);
        })
        .catch(error => {
            notification['error']({
                message: 'Unable to submit transaction'
            });
        });
    }

    return (
        <>
            <Form
                form={form}
                layout="vertical"
                className="add-pc-model-form"
                onFinish={onFinish}
            >
                <Form.Item
                    name="ModelId"
                    label="Model Id"
                    rules={[
                    {
                        required: true
                    }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>
            </Form>

            <>
                {result}
            </>
        </>
    );
}

export const QueryComponent = () => {
    const [form] = Form.useForm();
    const [result, setResult] = useState('');

    const onFinish = values => {
        let id = values['ComponentId'];
        fetch(`http://localhost:5000/queryComponent?ComponentId=${id}`)
        .then(res => res.json())
        .then(data => {
            setResult(data['result']);
        })
        .catch(error => {
            notification['error']({
                message: 'Unable to submit transaction'
            });
        });
    }

    return (
        <>
            <Form
                form={form}
                layout="vertical"
                className="add-pc-model-form"
                onFinish={onFinish}
            >
                <Form.Item
                    name="ComponentId"
                    label="Model Id"
                    rules={[
                    {
                        required: true
                    }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>
            </Form>

            <>
                {result}
            </>
        </>
    );
}
