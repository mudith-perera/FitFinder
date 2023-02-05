import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

import Aos from "aos";
import "aos/dist/aos.css";

const SearchBar = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  });

  const [gender, setGender] = useState("unisex");
  const handleChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <section data-aos="fade-right">
      <div className="container py-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-12">
            <div
              className="card card-registration card-registration-2"
              style={{ borderRadius: "15px", backgroundColor: "transparent" }}
            >
              <div className="card-body p-0">
                <div className="row g-0 ">
                  <div className="col-lg-12 bg-partthree">
                    <div className="p-3">
                      <Box
                        component="form"
                        sx={{
                          "& .MuiTextField-root": { m: 1, width: "30ch" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <h3 className="fw-normal mb-3">
                          &emsp;Find Your Gym Here... &emsp;
                        </h3>

                        <div className="row">
                          <div className="col-md-1 mb-3 pb-2"></div>
                          <div className="col-md-3 mb-3 pb-2">
                            <div className="form-outline">
                              <TextField
                                id="outlined-basic"
                                label="Gym"
                                variant="outlined"
                                size="small"
                                name="gymName"
                              />
                            </div>
                          </div>
                          <div className="col-md-3 mb-3 pb-2">
                            <div className="form-outline">
                              <TextField
                                id="outlined-basic"
                                label="Location"
                                variant="outlined"
                                size="small"
                                name="location"
                              />
                            </div>
                          </div>

                          <div className="col-md-2 pb-2">
                            <Select
                              name="gymSexType"
                              sx={{ m: 1, minWidth: 120 }}
                              size="small"
                              labelId="demo-select-small"
                              id="demo-select-small"
                              value={gender}
                              label="Age"
                              onChange={handleChange}
                            >
                              <MenuItem value={"unisex"}>Unisex</MenuItem>
                              <MenuItem value={"male"}>Male</MenuItem>
                              <MenuItem value={"female"}>Female</MenuItem>
                            </Select>
                          </div>
                          <div className="col-md-3 pb-2">
                            <Button variant="contained" size="large">
                              Search
                            </Button>
                          </div>
                        </div>
                      </Box>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SearchBar;
