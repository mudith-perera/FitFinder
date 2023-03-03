import React, { useEffect, useState } from "react";
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBtn,
  MDBCard,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import SideNavbar from "../Shared/SideNavbar.js";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    };
    getUsers();
  }, []);

  const handleManageSchedule = (userId) => {
    navigate(`/manage-schedule/${userId}`);
  };

  return (
    <div>
      <div style={{ position: "fixed", zIndex: "1" }}>
        <SideNavbar userRole="coach" />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <MDBCard
          background="dark"
          style={{ borderRadius: "10px", overflow: "hidden" }}
        >
          <MDBTable hover responsive bordered>
            <MDBTableHead>
              <tr className="table-dark">
                <th>Name</th>
                <th>Email</th>
                <th>CreatedAt</th>
                <th>Manage Schedule</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {users.map((user) => (
                <tr key={user._id} className="table-dark">
                  <td>{user.firstname}</td>
                  <td>{user.email}</td>
                  <td>{user.createdAt}</td>
                  <td>
                    <MDBBtn onClick={() => handleManageSchedule(user._id)}>
                      Manage Schedule
                    </MDBBtn>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </MDBCard>
      </div>
    </div>
  );
};

export default UserTable;
