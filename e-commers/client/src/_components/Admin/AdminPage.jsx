import { Button, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import axios from "axios";
const AdminPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/admin/users");
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

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (imgSrc) => (
        <img src={imgSrc} alt="avatar" className="w-10 h-10 rounded-full" />
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title="Kullanıcıyı Sil"
          description="Kullanıcıyı silmek istediğinizden emin misiniz?"
          okText="Yes"
          cancelText="No"
          onConfirm={() => deleteUser(record.email)}
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];
  const deleteUser = async (email) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/admin/users/${email}`
      );
      if (res.status === 201) {
        setDataSource((prevState) =>
          prevState.filter((user) => user.email !== email)
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
      loading={loading}
      rowKey={(i) => i._id}
    />
  );
};

export default AdminPage;
