import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Select, Spin } from "antd";
import axios from "axios";

const AdminProducts = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/categories");
        if (res.status === 200) {
          setCategories(res.data);
        } else {
          alert("Kategoriler alınırken bir hata oluştu!");
        }
      } catch (error) {
        console.log(error.message || error.response.data.message);
      }
    };
    fetchData();
  }, []);
  const onFinish = async (values) => {
    setLoading(true);
    const imgLinks = values.img.split("\n").map((link) => link.trim());
    const colors = values.colors.split("\n").map((color) => color.trim());
    const sizes = values.sizes.split("\n").map((size) => size.trim());
    try {
      const res = await axios.post("http://localhost:3000/product", {
        ...values,
        price: {
          current: values.current,
          discount: values.discount,
        },
        img: imgLinks,
        sizes,
        colors,
      });
      if (res.status === 201) {
        form.resetFields();
        setLoading(false);
        alert("Ürün başarıyla oluşturuldu!");
      } else {
        setLoading(false);
        alert("Ürün oluşturulurken bir hata oluştu!");
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

export default AdminProducts;
