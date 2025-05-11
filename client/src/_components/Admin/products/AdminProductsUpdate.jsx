import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, InputNumber, Select, Spin } from "antd";
import axios from "axios";

const AdminProductsUpdate = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const imgLinks = values.img.split("\n").map((item) => item.trim());
      const sizes = values.sizes.split("\n").map((item) => item.trim());
      const colors = values.colors.split("\n").map((item) => item.trim());
      const res = await axios.put(`http://localhost:3000/product/${id}`, {
        ...values,
        price: {
          current: values.current,
          discount: values.discount,
        },
        img: imgLinks,
        sizes,
        colors,
      });
      if (res.status === 200) {
        form.resetFields();
        setLoading(false);
        navigate("/admin/products");
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
        const [categoriesRes, productsRes] = await Promise.all([
          axios.get("http://localhost:3000/categories"),
          axios.get(`http://localhost:3000/product/${id}`),
        ]);
        if (categoriesRes.status === 200) {
          const categories = categoriesRes.data;
          setCategories(categories);
        }
        if (productsRes.status === 200) {
          const product = productsRes.data;
          form.setFieldsValue({
            name: product.name,
            description: product.description,
            current: product.price.current,
            discount: product.price.discount,
            img: product.img.join("\n"),
            colors: product.colors.join("\n"),
            sizes: product.sizes.join("\n"),
            category: product.category,
          });
        }
      } catch (error) {
        console.log(error.message || error.response.data.message);
      }
    };
    fetchData();
  }, [id, form]);
  return (
    <Spin spinning={loading}>
      <Form name="basic" layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item
          label="Ürün İsmi"
          name="name"
          rules={[
            {
              required: true,
              message: "Lütfen Ürün İsimini girin!",
            },
          ]}
        >
          <Input autoFocus={true} />
        </Form.Item>

        <Form.Item
          label="Ürün Açıklaması"
          name="description"
          rules={[
            {
              required: true,
              message: "Lütfen bir Açıklama girin!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Her bir açıklama yazın."
            autoSize={{ minRows: 1 }}
          />
        </Form.Item>

        <Form.Item
          label="Fiyat"
          name="current"
          rules={[
            {
              required: true,
              message: "Lütfen Ürün fiyatını girin!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="İndirim Oranı"
          name="discount"
          rules={[
            {
              required: true,
              message: "Lütfen bir ürün indirim oranı girin!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Ürün Görseli (Link)"
          name="img"
          rules={[
            {
              required: true,
              message: "Lütfen en az 4 ürün görsel linki girin!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Her bir görsel linkini yeni bir satıra yazın."
            autoSize={{ minRows: 4 }}
          />
        </Form.Item>

        <Form.Item
          label="Ürün Renkleri (RGB kodları)"
          name="colors"
          rules={[
            {
              required: true,
              message: "Lütfen en az 1 ürün rengi girin!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Her bir RGB kodunu yeni bir satıra yazın."
            autoSize={{ minRows: 1 }}
          />
        </Form.Item>

        <Form.Item
          label="Ürün Bedenleri"
          name="sizes"
          rules={[
            {
              required: true,
              message: "Lütfen en az 1 ürün beden ölçüsü girin!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Her bir beden ölçüsünü yeni bir satıra yazın."
            autoSize={{ minRows: 1 }}
          />
        </Form.Item>

        <Form.Item
          label="Ürün Kategorisi"
          name="category"
          rules={[
            {
              required: true,
              message: "Lütfen 1 kategori seçin!",
            },
          ]}
        >
          <Select>
            {categories.map((category) => (
              <Select.Option value={category._id} key={category._id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Oluştur
        </Button>
      </Form>
    </Spin>
  );
};

export default AdminProductsUpdate;
