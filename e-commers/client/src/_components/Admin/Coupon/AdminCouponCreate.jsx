import { Button, Form, Input, InputNumber, Spin } from "antd";
import axios from "axios";
import React, { useState } from "react";

const AdminCouponCreate = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/coupon", values);
      if (res.status === 201) {
        form.resetFields();
        setLoading(false);
        alert("Kupon başarıyla oluşturuldu!");
      } else {
        setLoading(false);

        alert("Kupon oluşturulurken bir hata oluştu!");
      }
    } catch (error) {
      console.log(error.message || error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
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
          Oluştur
        </Button>
      </Form>
    </Spin>
  );
};

export default AdminCouponCreate;
