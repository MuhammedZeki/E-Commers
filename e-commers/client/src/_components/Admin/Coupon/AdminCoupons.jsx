import { Button, Popconfirm, Space, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const AdminCoupons = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const columns = [
    {
      title: "Kupon Kodu",
      dataIndex: "code",
      key: "code",
      render: (code) => <b>{code}</b>,
    },
    {
      title: "İndirim Oranı",
      dataIndex: "discountPercent",
      key: "discountPercent",
      render: (code) => <span>%{code}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/coupon/update/${record._id}`)}
          >
            Güncelle
          </Button>
          <Popconfirm
            title="Kuponu Sil"
            description="Kuponu silmek istediğinizden emin misiniz?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteCoupon(record._id)}
          >
            <Button type="primary" danger>
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/coupon");
        if (res.status === 200) {
          setDataSource(res.data);
        } else {
          console.log(res.data.message || res.response.data.message);
        }
      } catch (error) {
        console.log(error.message || error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const deleteCoupon = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/coupon/${id}`);
      if (res.status === 200) {
        setDataSource((prevState) =>
          prevState.filter((item) => item._id !== id)
        );
      } else {
        console.log(res.data.message || res.response.data.message);
      }
    } catch (error) {
      console.log(error.message || error.response.data.message);
    }
  };
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
    />
  );
};

export default AdminCoupons;
