import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

import "./userTable.css";

import SideNavbar from "../Shared/SideNavbar.js";

import Aos from "aos";
import "aos/dist/aos.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#004d80",
    },
    secondary: {
      main: "#b0bec5",
    },
  },
});

const columns = [
  { field: "id", headerName: "ID", hide: true,headerClassName: "table-header" },
  {
    field: "firstname",
    headerName: "Owner Name",
    flex: 1.5,
    headerClassName: "table-header",
  },
  {
    field: "email",
    headerName: "Email",
    flex: 8.5,
    headerClassName: "table-header",
  },
  {
    field: "activeStatus",
    headerName: "Status",
    flex: 2,
    headerClassName: "table-header",
    renderCell: (params) => {
      const handleStatusChange = async (event) => {
        try {
          const response = await axios.put(
            `/api/users/updateUserStatus/${params.row._id}`, // Use the MongoDB ID of the user
            {
              activeStatus: event.target.value === "true" ? false : true,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          alert("Status updated");
          window.location.reload();
          params.setValue(response.data.activeStatus);
        } catch (error) {
          console.log(error);
        }
      };

      return (
        <ToggleButtonGroup
          value={params.value}
          exclusive
          onChange={handleStatusChange}
        >
          <ToggleButton value={false} className="active-button">
            Active
          </ToggleButton>
          <ToggleButton value={true} className="inactive-button">
            Inactive
          </ToggleButton>
        </ToggleButtonGroup>
      );
    }
  }
];

const ManageGyms = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    Aos.init({ duration: 1000 });
    const getUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        
        const filteredUsers = response.data.filter(
            (user) =>  user.userType === "gym"
          );
          const updatedUsers = filteredUsers.map((user, index) => {
            return { ...user, id: index + 1 };
          });
        setUsers(updatedUsers);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstname} ${user.lastname}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  return (
    <>
      <div style={{ position: "fixed", zIndex: "1" }}>
        <SideNavbar userRole="admin" />
      </div>

      <section data-aos="fade-right" className=" gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-8 col-lg-2 col-xl-11">
              <div className="card bg-white" style={{ borderRadius: "1rem",width: "1250px" }}>
                <div className="card-body p-3">
                  <div>
                    <h2 style={{ textAlign: "center" }}>
                      Manage Gyms
                    </h2>
                    <ThemeProvider theme={theme}>
                      <Box
                        className=""
                        sx={{ display: "flex", alignItems: "center", p: 1 }}
                      >
                        <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
                        <TextField
                          label="Search"
                          variant="standard"
                          size="small"
                          fullWidth
                          value={searchText}
                          onChange={handleSearchChange}
                        />
                      </Box>
                      <div
                        className="table-row"
                        style={{ height: 600, width: "100%" }}
                      >
                        <DataGrid
                          rows={filteredUsers}
                          columns={columns}
                          pageSize={10}
                          rowsPerPageOptions={[10, 25, 50]}
                          disableSelectionOnClick
                        />
                      </div>
                    </ThemeProvider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ManageGyms;
