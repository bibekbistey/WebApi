// import React, { useEffect, useState } from "react";
// import Layout from "./../../components/Layout";
// import axios from "axios";
// import { Table } from "antd";
// const Users = () => {
//   const [users, setUsers] = useState([]);

//   //getUsers
//   const getUsers = async () => {
//     try {
//       const res = await axios.get("/api/v1/admin/getAllUsers", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       if (res.data.success) {
//         setUsers(res.data.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getUsers();
//   }, []);

//   // antD table col
//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//     },
//     {
//       title: "Doctor",
//       dataIndex: "isDoctor",
//       render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
//     },
//     {
//       title: "Actions",
//       dataIndex: "actions",
//       render: (text, record) => (
//         <div className="d-flex">
//           <button className="btn btn-danger">Block</button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <Layout>
//       <h1 className="text-center m-2">Users List</h1>
//       <Table columns={columns} dataSource={users} />
//     </Layout>
//   );
// };

// export default Users;




import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";

const Users = () => {
  const [users, setUsers] = useState([]);

  // getUsers
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // delete User

  const deleteUsers = async (record,status) => {
    try {
      const res = await axios.get("/api/v1/admin/deleteUsers", {
        userId: record.userId, status: status},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
      );
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
    deleteUsers();
  }, []);

  // antD table col
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="flex">
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={() => deleteUsers(record, "deleted")}>
            
            Block
          </button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-2 text-3xl font-bold">Users List</h1>
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
};

export default Users;
