import { Button, Form, Input, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const AdminCategoriesUpdate = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/categories/${id}`,
        values
      );
      if (res.status === 200) {
        navigate(`/admin/categories`);
      } else {
        alert("Kategori güncellenemedi!");
      }
    } catch (error) {
      console.log(error.message || error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/categories/${id}`);
        if (res.status === 200) {
          form.setFieldsValue({
            name: res.data.name,
            img: res.data.img,
          });
        } else {
          alert("Kategori bulunamadı!");
        }
      } catch (error) {
        console.log(error.message || error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, form]);

  return (
    <Spin spinning={loading}>
      <Form
        name="basic"
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
        form={form}
      >
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
          Güncelle
        </Button>
      </Form>
    </Spin>
  );
};

export default AdminCategoriesUpdate;
