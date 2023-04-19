import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
  TablePagination,
} from "@mui/material";
import "./FaQTable.css";

import SideNavbar from "../Shared/SideNavbar.js";

import Aos from "aos";
import "aos/dist/aos.css";

function FaQTable() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    Aos.init({ duration: 1000 });
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

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <>
      <div style={{ position: "fixed", zIndex: "1" }}>
        <SideNavbar userRole="admin" />
      </div>

      <section data-aos="fade-right" className=" gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-md-8 col-lg-2 col-xl-11">
              <div
                className="card bg-white"
                style={{ borderRadius: "1rem", width: "1250px" }}
              >
                <div className="card-body p-3">
                  <h2 style={{ textAlign: "center" }}>FAQ TABLE</h2>
                  <Table
                    className="rootT"
                    style={{ width: "90%", margin: "auto" }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell
                          className="headerT"
                          style={{
                            color: "#ffffff",
                            textAlign: "center",
                            fontSize: "20px",
                          }}
                        >
                          Email
                        </TableCell>
                        <TableCell
                          className="headerT"
                          style={{
                            color: "#ffffff",
                            textAlign: "center",
                            fontSize: "20px",
                          }}
                        >
                          Question
                        </TableCell>
                        <TableCell
                          className="headerT"
                          style={{
                            color: "#ffffff",
                            textAlign: "center",
                            fontSize: "20px",
                          }}
                        >
                          Answer
                        </TableCell>
                        <TableCell
                          className="headerT"
                          style={{
                            color: "#ffffff",
                            textAlign: "center",
                            fontSize: "20px",
                          }}
                        >
                          Submit
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(rowsPerPage > 0
                        ? data.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : data
                      ).map((item) => (
                        <TableRow key={item._id} className="rowT">
                          <TableCell
                            style={{ width: "250px", textAlign: "center" }}
                          >
                            {item.email}
                          </TableCell>
                          <TableCell
                            className="question"
                            style={{
                              width: "450px",
                              textAlign: "center",
                              fontWeight: "bold",
                            }}
                          >
                            {item.userQuection}
                          </TableCell>
                          <TableCell>
                            <TextField
                              style={{ width: "500px", fontWeight: "bold" }}
                              id="standard-search"
                              label="Answer"
                              type="text"
                              variant="standard"
                              value={item.answer}
                              onChange={(e) =>
                                handleAnswerChange(item._id, e.target.value)
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              className="buttonT"
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FaQTable;
