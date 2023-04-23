///////////////////////// Developer       : Mudith Perera  /////////////////////////
///////////////////////// Modified Date   : 07-02-2023     /////////////////////////
/////////////////////////           (START)                /////////////////////////

import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";

import InputLabel from "@mui/material/InputLabel";

import Aos from "aos";
import "aos/dist/aos.css";

import { locations } from "../Shared/locations.js";

const SearchBar = ({ onDataFromSearchBar }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    Aos.init({ duration: 1000 });

    //get all the gyms that are active
    const fetchData = async () => {
      const response = await fetch("api/gyms/");
      const data = await response.json();
      setOptions(data);
    };
    fetchData();
  }, []);

  //Gym Drop Down Handlers (START)
  const [gymName, setGymName] = useState("");
  const [selectedGymName, setSelectedGymName] = useState(null);

  const getGymOptionLabel = (option) => {
    if (!option) {
      return "";
    }
    return option.gymName || "";
  };
  const handleOptionChangeGym = (event, newValue) => {
    setSelectedGymName(newValue);
    setGymName(getGymOptionLabel(newValue));
    if (!newValue) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };
  //Gym Drop Down Handlers (END)

  const [isDisabled, setIsDisabled] = useState(false);

  //Location Drop Down Handlers (START)
  const [location, setLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  const getLocationOptionLabel = (locations) => {
    if (!locations) {
      return "";
    }
    return locations.label || "";
  };
  const handleOptionChangeLocation = (event, newValue) => {
    setSelectedLocation(newValue);
    setLocation(getLocationOptionLabel(newValue));
  };
  //Location Drop Down Handlers (END)

  //gymSexType Drop Down Handlers (START)
  const [gymSexType, setGender] = useState();

  const handleChange = (event) => {
    setGender(event.target.value);
  };
  //gymSexType Drop Down Handlers (END)

  //Get the search Result
  const searchForGyms = async (e) => {
    e.preventDefault();
    const formData = { gymName, location, gymSexType };
    const response = await fetch("/api/search/search-gyms/", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    //set data to the home page (child to parent)
    onDataFromSearchBar(json);
  };

  return (
    <section data-aos="fade-right">
      <div className="container py-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-11">
            <div
              className="card card-registration card-registration-2"
              style={{ borderRadius: "15px", backgroundColor: "transparent" }}
            >
              <div className="card-body p-0">
                <form onSubmit={searchForGyms}>
                  <div className="row g-0 ">
                    <div className="col-lg-12 bg-partthree">
                      <div className="p-3">
                        <Box
                          sx={{
                            "& .MuiTextField-root": { m: 1, width: "80%" },
                            "& .MuiAutocomplete-root": { width: "200%" },
                          }}
                          noValidate
                          autoComplete="off"
                        >
                          <h3 className="fw-normal mb-3">
                            &emsp;Find Your Gym Here... &emsp;
                          </h3>

                          <div className="row">
                            <div className="col-md-3 mb-3 pb-2"></div>
                            
                            <div className="col-md-2 mb-3 pb-2">
                              <div className="form-outline">
                                <FormControl>
                                  <Autocomplete
                                    options={options}
                                    size="small"
                                    getOptionLabel={getGymOptionLabel}
                                    value={selectedGymName}
                                    onChange={handleOptionChangeGym}
                                    renderInput={(params) => (
                                      <TextField {...params} label="Gym" />
                                    )}
                                  />
                                </FormControl>
                              </div>
                            </div>
                            <div className="col-md-2 mb-3 pb-2">
                              <div className="form-outline">
                                <FormControl>
                                  <Autocomplete
                                    options={locations}
                                    getOptionLabel={getLocationOptionLabel}
                                    value={selectedLocation}
                                    size="small"
                                    renderInput={(params) => (
                                      <TextField {...params} label="Location" />
                                    )}
                                    onChange={handleOptionChangeLocation}
                                    disabled={isDisabled}
                                  />
                                </FormControl>
                              </div>
                            </div>

                            <div className="col-md-2 pb-2">
                              
                              <FormControl>
                                <InputLabel id="labelLocation">Sex</InputLabel>
                                <Select
                                  name="gymSexType"
                                  sx={{ m: 1, minWidth: 120 }}
                                  size="small"
                                  labelId="demo-select-small"
                                  id="demo-select-small"
                                  value={gymSexType}
                                  label="Age"
                                  onChange={handleChange}
                                  disabled={isDisabled}
                                >
                                  <MenuItem value={""}></MenuItem>
                                  <MenuItem value={"male"}>Male</MenuItem>
                                  <MenuItem value={"female"}>Female</MenuItem>
                                </Select>
                              </FormControl>
                            </div>
                            <div className="col-md-3 pb-2">
                              <Button
                                variant="contained"
                                size="large"
                                type="submit"
                              >
                                Search
                              </Button>
                            </div>
                          </div>
                        </Box>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SearchBar;
