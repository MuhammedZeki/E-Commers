import { Spin, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
const AdminOrders = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: "Email",
      dataIndex: "receipt_email",
      key: "receipt_email",
    },
    {
      title: "Fiyat",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <p>
          ${" "}
          {new Intl.NumberFormat("tr-TR", {
            style: "decimal",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(amount)}
        </p>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/v1/payment_intents");
        if (res.status === 200) {
          const { data } = res.data;
          setDataSource(data);
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

  return (
    <Spin spinning={loading}>
      <Table
        dataSource={dataSource}
        loading={loading}
        columns={columns}
        rowKey={(i) => i.id}
      />
    </Spin>
  );
};

export default AdminOrders;
