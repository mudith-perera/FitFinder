import React, { useCallback, useEffect, useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";

import SideNavbar from "../Shared/SideNavbar.js";
//import Typography from '@material-ui/core/Typography'

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
//import { Delete, Edit } from '@mui/icons-material';
//import { data, states } from './makeData';

/*const data = [
    { id: 1, firstName: "Mudith", email: 'Mudith@gmail.com', phone: 1234567890, city: "Kalaniya",status:"Deactivated"},
    { id: 2, firstName: "Madara", email: 'Madara@gmail.com', phone: 1234567890, city: "Panadura",status:"Deactivated" },
    { id: 3, firstName: "Sachintha", email: 'Sachintha@gmail.com', phone: 1234567890, city: "Walasmulla",status:"Deactivated" },
    { id: 4, firstName: "Gimhani", email: 'Gimhani@gmail.com', phone: 1234567890, city: "Padukka",status:"Activae" },
    { id: 5, firstName: "Dilini", email: 'Dilini@gmail.com', phone: 1234567890, city: "Galle",status:"Deactivated" },
    { id: 6, firstName: "Vimukthi", email: 'Vimukthi@gmail.com', phone: 1234567890, city: "Malabe",status:"Active" }
  ]
*/
const states = [
  {
    stat: "Active",
  },
  {
    stat: "Dativated",
  },
];

const ViewAllGymMembersTable = () => {
  const url = "http://localhost:4000/data";
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  //show all data
  const getData = () => {
    fetch(url)
      .then((response) => response.json())
      .then((response) => setTableData(response));
  };
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  //new row addding

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      const { id, ...updatedRow } = values; // Extract the updated row data without the id field
      try {
        const response = await fetch(`${url}/${id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(updatedRow),
        });
        if (response.ok) {
          const updatedTableData = tableData.map((item) => {
            if (item.id === id) {
              return { ...item, ...updatedRow }; // Merge the updated row data with the original row data
            }
            return item;
          });
          setTableData(updatedTableData);
          setTableData([...tableData]); // trigger a re-render of the table with the updated row
          exitEditingMode();
        } else {
          throw new Error("Failed to update row");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid = cell.column.id === "email";
          //? validateEmail(event.target.value)
          //: cell.column.id === 'age'
          //? validateAge(+event.target.value)
          //: validateRequired(event.target.value);
          /*if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }*/
        },
      };
    },
    [validationErrors]
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: "firstName",
        header: "First Name",
        enableEditing: false, //disable editing on this column
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "city",
        header: "City",
        enableEditing: false, //disable editing on this column
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "email",
        header: "Email",
        enableEditing: false, //disable editing on this column
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "email",
        }),
      },
      {
        accessorKey: "phone",
        header: "Phone",
        enableEditing: false, //disable editing on this column
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "number",
        }),
      },
      {
        accessorKey: "status",
        header: "Status",
        muiTableBodyCellEditTextFieldProps: {
          select: true, //change to select for a dropdown
          children: states.map((state) => (
            <MenuItem key={state.stat} value={state.stat}>
              {state.stat}
            </MenuItem>
          )),
        },
      },
    ],
    [getCommonEditTextFieldProps]
  );

  return (
    <div>
      <div style={{ position: "fixed", zIndex: "1" }}>
        <SideNavbar userRole="gym" />
      </div>
      <div
        className="container py-5 h-100"
        style={{ position: "relative", zIndex: "0" }}
      >
        <MaterialReactTable
          displayColumnDefOptions={{
            "mrt-row-actions": {
              muiTableHeadCellProps: {
                align: "center",
              },
              size: 120,
            },
          }}
          columns={columns}
          data={tableData}
          editingMode="row"
          positionActionsColumn="last"
          enableEditing
          onEditingRowSave={handleSaveRowEdits}
          //onEditingRowSave={handleSaveRowEdits}
          onEditingRowCancel={handleCancelRowEdits}
          renderTopToolbarCustomActions={() => (
            <div>
              <h4>FitFinder Member</h4>
              <br></br>
            </div>
          )}
        />
      </div>
    </div>
  );
};

//example of creating a mui dialog modal for creating new rows
export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Add New Account</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            {columns.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Create New Account
        </Button>
      </DialogActions>
    </Dialog>
  );
};

/*const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
const validateAge = (age) => age >= 18 && age <= 50;
*/

export default ViewAllGymMembersTable;
