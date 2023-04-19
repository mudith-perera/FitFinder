import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';

import './userTable.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#004d80',
    },
    secondary: {
      main: '#b0bec5',
    },
  },
});

const columns = [
  { field: 'id', headerName: 'ID', hide: true },
  {
    field: 'firstname',
    headerName: 'First Name',
    flex: 1.5,
    headerClassName: 'table-header',
  },
  {
    field: 'lastname',
    headerName: 'Last Name',
    flex: 1.5,
    headerClassName: 'table-header',
  },
  { field: 'age', headerName: 'Age', flex: 0.25, headerClassName: 'table-header' },
  {
    field: 'address',
    headerName: 'Address',
    flex: 2,
    headerClassName: 'table-header',
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1.5,
    headerClassName: 'table-header',
  },
  {
    field: 'gender',
    headerName: 'Gender',
    flex: 0.75,
    headerClassName: 'table-header',
  },
  {
    field: 'contact',
    headerName: 'Phone Number',
    flex: 1,
    headerClassName: 'table-header',
  },
  {
    field: 'userType',
    headerName: 'User',
    flex: 1,
    headerClassName: 'table-header',
  },
  {
    field: 'userComments',
    headerName: 'Comments',
    flex: 2,
    headerClassName: 'table-header',
  },
  {
    field: 'coachType',
    headerName: 'Coach Type',
    flex: 1,
    headerClassName: 'table-header',
  },
  {
    field: 'activeStatus',
    headerName: 'Status',
    flex: 2,
    headerClassName: 'table-header',
    renderCell: (params) => {
      const handleStatusChange = async (event) => {
        try {
          const response = await axios.put(
            `/api/users/updateUserStatus/${params.row._id}`, // Use the MongoDB ID of the user
            {
              activeStatus: event.target.value === 'true' ? false : true,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          alert('Status updated');
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
    },
  },
];

const ViewAndUpdateAllUsersTable = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        const updatedUsers = response.data.map((user, index) => {
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
    <div>
    <h2 style={{textAlign:"center"}}>View & Update All Users Table</h2>
      <ThemeProvider theme={theme}>
        <Box className='' sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
          <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
          <TextField
            label="Search"
            variant="standard"
            size="small"
            fullWidth
            value={searchText}
            onChange={handleSearchChange}
          />
        </Box>
        <div className='table-row'style={{ height: 600, width: '100%' }}>
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
  );
};
export default ViewAndUpdateAllUsersTable
