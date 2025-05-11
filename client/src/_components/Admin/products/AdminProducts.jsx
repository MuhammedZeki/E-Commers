import { Button, Popconfirm, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AdminProducts = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const columns = [
    {
      title: "Product Görseli",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => <img src={imgSrc[0]} alt="Image" width={100} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Kategori",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Fiyat",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>{text.current.toFixed(2)}</span>,
    },
    {
      title: "İndirim",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>%{text.discount}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/products/update/${record._id}`)}
          >
            Düzenle
          </Button>
          <Popconfirm
            title="Kategoriyi Sil"
            description="Kategoriyi silmek istediğinizden emin misiniz?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteProduct(record._id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          axios.get("http://localhost:3000/categories"),
          axios.get("http://localhost:3000/product"),
        ]);
        const categories = categoriesRes.data;
        const products = productsRes.data;
        const productsWithCategoryName = products.map((product) => {
          const categoryId = product.category;
          const category = categories.find((cat) => cat._id === categoryId);
          return {
            ...product,
            categoryName: category ? category.name : "Bilinmiyor",
          };
        });
        setDataSource(productsWithCategoryName);
      } catch (error) {
        console.log(error.message || error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/product/${id}`);
      if (res.status === 200) {
        setDataSource((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert("Ürün silinirken bir hata oluştu!");
      }
    } catch (error) {
      console.log(error.message || error.response.data.message);
    }
  };
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      rowKey={(i) => i._id}
    />
  );
};

export default AdminProducts;
