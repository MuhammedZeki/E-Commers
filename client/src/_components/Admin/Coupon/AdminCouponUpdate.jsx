import { Button, Form, Input, InputNumber, Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AdminCouponUpdate = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); // Assuming you're using react-router-dom to get the ID from the URL
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.put(`http://localhost:3000/coupon/${id}`, values);
      if (res.status === 200) {
        form.resetFields();
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message || error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/coupon/${id}`);
        if (res.status === 201) {
          form.setFieldsValue({
            code: res.data.code,
            discountPercent: res.data.discountPercent,
          });
        } else {
          console.log(res.data.message || res.response.data.message);
        }
      } catch (error) {
        console.log(error.message || error.response.data.message);
      }
    };
    fetchData();
  }, [form, id]);
  return (
    <Spin spinning={loading}>
      <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Kod İsmi"
          name="code"
          rules={[
            {
              required: true,
              message: "Lütfen Kod adını girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="İndirim Oranı"
          name="discountPercent"
          rules={[
            {
              required: true,
              message: "Lütfen İndirim oranı girin!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Güncelle
        </Button>
      </Form>
    </Spin>
  );
};

export default AdminCouponUpdate;
