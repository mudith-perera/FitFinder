/*
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, Button, TablePagination } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    borderRadius: 8,
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#8c8c8c",
    color: "#000000",
    fontWeight: "bold",
    textAlign:"center",
  },
  row: {
    
    "&:nth-of-type(odd)": {
      backgroundColor: "#d9d9d9",
    },
    "&:nth-of-type(even)":{
        backgroundColor: "#a6a6a6",
    },
    textAlign:"center",
  },
  button: {
    backgroundColor: "#a3a3ff",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#4d4dff",
    },
  },
});

function FaQTable() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("/api/faq?exclude=answer");
      setData(result.data);
    }
    fetchData();
  }, []);

  const handleAnswerChange = (id, answer) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item._id === id) {
          return { ...item, answer };
        } else {
          return item;
        }
      })
    );
  };

  const handleAnswerSubmit = async (id) => {
    const item = data.find((item) => item._id === id);
    if (item && item._id) {
      await axios.put(`/api/faq/${id}`, { answer: item.answer });
      setData((prevData) =>
        prevData.map((prevItem) =>
          prevItem._id === id ? { ...prevItem, answer: "" } : prevItem
        )
      );
    } else {
      console.log(`Item with ID ${id} not found`);
    }
  };

  const classes = useStyles();
  const rowsPerPage = 10;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Table className={classes.root} >
        <TableHead>
          <TableRow>
            <TableCell className={classes.header}>Email</TableCell>
            <TableCell className={classes.header}>Question</TableCell>
            <TableCell className={classes.header}>Answer</TableCell>
            <TableCell className={classes.header}>Submit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item._id} className={classes.row} >
              <TableCell>{item.email}</TableCell>
              <TableCell className="question">{item.userQuection}</TableCell>
              <TableCell>
                <TextField
                  className="answer"
                  type="text"
                  style={{width:"550px"}}
                  value={item.answer}
                  onChange={(e) => handleAnswerChange(item._id, e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={() => handleAnswerSubmit(item._id)}
                >
                  Submit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
    </Table>
    </>
  );
}

export default FaQTable;
*/
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, Button, TablePagination } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    borderRadius: 8,
    overflow: "hidden",
  },
  header: {
    backgroundColor: "#404040",
    color: "#000000",
    fontWeight: "bold",
    textAlign:"center",
    height:"40px",
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#eaeaea",
    },
    "&:nth-of-type(even)":{
        backgroundColor: "#e6faff",
    },
    textAlign:"center",
    height:"30px",
    
  },
  button: {
    backgroundColor: "#a3a3ff",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#4d4dff",
    },
  },
});
function FaQTable() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
    useEffect(() => {
      async function fetchData() {
        const result = await axios.get("/api/faq?exclude=answer");
        setData(result.data);
      }
      fetchData();
    }, []);
  
    const handleAnswerChange = (id, answer) => {
      setData((prevData) =>
        prevData.map((item) => {
          if (item._id === id) {
            return { ...item, answer };
          } else {
            return item;
          }
        })
      );
    };
  
    const handleAnswerSubmit = async (id) => {
      const item = data.find((item) => item._id === id);
      if (item && item._id) {
        await axios.put(`/api/faq/${id}`, { answer: item.answer });
        setData((prevData) =>
          prevData.map((prevItem) =>
            prevItem._id === id ? { ...prevItem, answer: "" } : prevItem
          )
        );
      } else {
        console.log(`Item with ID ${id} not found`);
      }
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 8));
      setPage(0);
    };
  
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
  
    const classes = useStyles();
  
    return (
      <div>
      <h2 style={{textAlign:"center"}}>FAQ TABLE</h2>
        <Table className={classes.root} style={{width:"90%",margin: "auto"}}>
          <TableHead>
            <TableRow >
              <TableCell className={classes.header}style={{color:"#ffffff",textAlign:"center",fontSize:"20px"}}>Email</TableCell>
              <TableCell className={classes.header}style={{color:"#ffffff",textAlign:"center",fontSize:"20px"}}>Question</TableCell>
              <TableCell className={classes.header}style={{color:"#ffffff",textAlign:"center",fontSize:"20px"}}>Answer</TableCell>
              <TableCell className={classes.header}style={{color:"#ffffff",textAlign:"center",fontSize:"20px"}}>Submit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((item) => (
              <TableRow key={item._id} className={classes.row}>
                <TableCell style={{width:"250px",textAlign:"center"}}>{item.email}</TableCell>
                <TableCell className="question"style={{width:"450px",textAlign:"center",fontWeight: "bold",}} >{item.userQuection}</TableCell>
                <TableCell >

                <TextField
                      style={{width:"500px",fontWeight: "bold",}}
                      id="standard-search"
                      label="Answer"
                      type="text"
                      variant="standard"
                      value={item.answer}
                    onChange={(e) => handleAnswerChange(item._id, e.target.value)}
                    />
        
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    className={classes.button}
                    onClick={() => handleAnswerSubmit(item._id)}
                  >
                    Submit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
  
            {emptyRows > 0 && (
              <TableRow style={{ height: 50 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
          <TablePagination
            rowsPerPageOptions={[10, 20, 50]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}

          />
        </Table>
      </div>
    );
  }
  
  export default FaQTable;
  