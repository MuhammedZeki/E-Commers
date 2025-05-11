import { Button, Form, Input, Spin } from "antd";
import axios from "axios";
import React, { useState } from "react";

const AdminCategoriesCreate = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/categories", values);
      if (res.status === 201) {
        form.resetFields();
        setLoading(false);
        alert("Kategori başarıyla oluşturuldu!");
      } else {
        setLoading(false);
        alert("Kategori oluşturulurken bir hata oluştu!");
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
          label="Kategori İsmi"
          name="name"
          rules={[
            {
              required: true,
              message: "Lütfen kategori adını girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Kategori Görseli (Link)"
          name="img"
          rules={[
            {
              required: true,
              message: "Lütfen kategori görsel linkini girin!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Oluştur
        </Button>
      </Form>
    </Spin>
  );
};

export default AdminCategoriesCreate;
