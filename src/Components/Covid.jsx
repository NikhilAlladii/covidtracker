import {
  Box,
  Card,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

function Covid() {
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");

  const [countryName, setCountryName] = useState([]);
  const [countryCovidData, setCountryCovidData] = useState([]);

  const [countryWithCode, setCountryWithCode] = useState([]);

  const [searchedValue, setSearchedValue] = useState([]);

  const [searchedCountry, setSearchedCountry] = useState([]);

  const [forTesting, setForTesting] = useState([]);

  const [dataFound, setDataFound] = useState("okay");

  const [dataFoundWithSelect, setDataFoundWithSelect] = useState("no");

  console.log("searched data is", searchedValue);

  let number = 1;

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  const handleChangeCountryCode = (event) => {
    setCountryCode(event.target.value);
  };

  const getWorldData = () => {
    axios
      .get(
        "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/countries-name-ordered",
        {
          headers: {
            "X-RapidAPI-Host":
              "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
            "X-RapidAPI-Key":
              "207bb68696msh7c2ab8791bda0adp103defjsn290b1ec659d4",
          },
        }
      )
      .then((res) => {
        console.log("response is", res.data);
        setCountryName(res.data);
      });
  };

  const getCountryData = () => {
    axios
      .get(
        `https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/country-report-iso-based/${country}/${countryCode}`,
        {
          headers: {
            "X-RapidAPI-Host":
              "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
            "X-RapidAPI-Key":
              "207bb68696msh7c2ab8791bda0adp103defjsn290b1ec659d4",
          },
        }
      )
      .then((res) => {
        console.log("response is", res.data);
        res.data.length > 0
          ? setCountryWithCode(res.data)
          : setDataFoundWithSelect("okay");
        if (res.data.length > 0) {
          setCountryWithCode(res.data);
          setCountryCovidData();
          for (let prop in searchedCountry) {
            delete searchedCountry[prop];
          }
        }
      });
  };

  const getAllCovidData = () => {
    axios
      .get(
        `https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/countries`,
        {
          headers: {
            "X-RapidAPI-Host":
              "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
            "X-RapidAPI-Key":
              "207bb68696msh7c2ab8791bda0adp103defjsn290b1ec659d4",
          },
        }
      )
      .then((res) => {
        setCountryCovidData(res.data);
        setForTesting(res.data);
      });
  };

  let selectCountry = [];
  selectCountry = countryName?.map((country) => {
    return country?.Country;
  });

  let selectCountryCode = [];
  selectCountryCode = countryName?.map((country) => {
    return country?.ThreeLetterSymbol;
  });

  useEffect(() => {
    getWorldData();
    getAllCovidData();
  }, []);

  useEffect(() => {
    if (country.length > 1 && countryCode.length > 1) {
      getCountryData();
    }
  });

  function handleSubmit(event) {
    event.preventDefault();

    forTesting.map(function (covidDataByInput) {
      if (covidDataByInput.Country === searchedValue) {
        setSearchedCountry(covidDataByInput);
        setCountryWithCode([]);
        setCountryCovidData([]);
        setDataFound("okay");
      } else if (covidDataByInput.Country !== searchedValue) {
        setDataFound("no");
      }

      return 0;
    });
  }

  return (
    <div>
      <div>
        <Typography variant="h5">
          To Find The Particular Country Covid-19 Information
        </Typography>
      </div>
      <Box className="d-flex my-4">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Country</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={country}
            label="Country"
            onChange={handleChange}
            sx={{ width: "50%" }}
          >
            {selectCountry?.map((eachCountry) => (
              <MenuItem value={eachCountry}>{eachCountry}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Country Code</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={countryCode}
            label="Country Code"
            onChange={handleChangeCountryCode}
            sx={{ width: "50%" }}
          >
            {selectCountryCode?.map((eachCountry) => (
              <MenuItem value={eachCountry}>{eachCountry}</MenuItem>
            ))}
          </Select>
          {dataFoundWithSelect === "no" ? (
            <Typography variant="caption">
              Country,Country Code match then only data will show
            </Typography>
          ) : (
            <Typography variant="caption">Both Are Not Matched</Typography>
          )}
        </FormControl>

        <Box className="d-flex flex-column">
          <Paper
            component="form"
            sx={{
              p: "5px 4px",
              display: "flex",
              alignItems: "center",
              width: 500,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search By Country"
              inputProps={{ "aria-label": "search google maps" }}
              onChange={(event) => setSearchedValue(event.target.value)}
            />
            <IconButton
              type="submit"
              onClick={handleSubmit}
              sx={{ p: "10px" }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>

          {dataFound === "no" && Object.keys(searchedCountry).length === 0 ? (
            <Typography variant="caption">No data Found</Typography>
          ) : (
            <Typography variant="caption">
              Enter The Country Full Name(Eg:- India)
            </Typography>
          )}
        </Box>
      </Box>

      <div style={{ width: "100%", marginBottom: "30px" }}>
        <Grid className="insideGrid" container spacing={2}>
          {countryCovidData &&
            countryCovidData?.map((eachCountry, index) => (
              <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                <Card style={{ backgroundColor: "#d8edff" }}>
                  <CardContent className="d-flex flex-column">
                    <Typography variant="h6" className="my-2">
                      {number++}.&nbsp;{eachCountry?.Country}
                    </Typography>

                    <Typography variant="caption">
                      Country Code:{eachCountry?.ThreeLetterSymbol}
                    </Typography>
                    <Typography variant="caption">
                      Total Population:{eachCountry?.Population}
                    </Typography>

                    <Typography variant="caption">
                      Total Tests:{eachCountry?.TotalTests}
                    </Typography>

                    <Typography variant="caption">
                      Test Percentage:{eachCountry?.Test_Percentage}
                    </Typography>

                    <Typography variant="caption">
                      Total Covid Cases:{eachCountry?.TotalCases}
                    </Typography>

                    <Typography variant="caption">
                      Total Active Cases:{eachCountry?.ActiveCases}
                    </Typography>

                    <Typography variant="caption">
                      Patients in Critical Condition:
                      {eachCountry?.Serious_Critical}
                    </Typography>

                    <Typography variant="caption">
                      Total Recovered:{eachCountry?.TotalRecovered}
                    </Typography>

                    <Typography variant="caption">
                      Total Deaths{eachCountry?.TotalDeaths}
                    </Typography>

                    <Typography variant="caption">
                      Infection Risk:{eachCountry?.Infection_Risk}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}

          {countryWithCode &&
            countryWithCode?.map((eachCountry, index) => (
              <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
                <Card style={{ backgroundColor: "#d8edff" }}>
                  <CardContent className="d-flex flex-column">
                    <Typography variant="h6" className="my-2">
                      {number++}.&nbsp;{eachCountry?.Country}
                    </Typography>

                    <Typography variant="caption">
                      Country Code:{eachCountry?.ThreeLetterSymbol}
                    </Typography>
                    <Typography variant="caption">
                      Total Population:{eachCountry?.Population}
                    </Typography>

                    <Typography variant="caption">
                      Total Tests:{eachCountry?.TotalTests}
                    </Typography>

                    <Typography variant="caption">
                      Test Percentage:{eachCountry?.Test_Percentage}
                    </Typography>

                    <Typography variant="caption">
                      Total Covid Cases:{eachCountry?.TotalCases}
                    </Typography>

                    <Typography variant="caption">
                      Total Active Cases:{eachCountry?.ActiveCases}
                    </Typography>

                    <Typography variant="caption">
                      Patients in Critical Condition:
                      {eachCountry?.Serious_Critical}
                    </Typography>

                    <Typography variant="caption">
                      Total Recovered:{eachCountry?.TotalRecovered}
                    </Typography>

                    <Typography variant="caption">
                      Total Deaths{eachCountry?.TotalDeaths}
                    </Typography>

                    <Typography variant="caption">
                      Infection Risk:{eachCountry?.Infection_Risk}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}

          {Object.keys(searchedCountry).length > 0 && (
            <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
              <Card style={{ backgroundColor: "#d8edff" }}>
                <CardContent className="d-flex flex-column">
                  <Typography variant="h6" className="my-2">
                    {number++}.&nbsp;{searchedCountry?.Country}
                  </Typography>

                  <Typography variant="caption">
                    Country Code:{searchedCountry?.ThreeLetterSymbol}
                  </Typography>
                  <Typography variant="caption">
                    Total Population:{searchedCountry?.Population}
                  </Typography>

                  <Typography variant="caption">
                    Total Tests:{searchedCountry?.TotalTests}
                  </Typography>

                  <Typography variant="caption">
                    Test Percentage:{searchedCountry?.Test_Percentage}
                  </Typography>

                  <Typography variant="caption">
                    Total Covid Cases:{searchedCountry?.TotalCases}
                  </Typography>

                  <Typography variant="caption">
                    Total Active Cases:{searchedCountry?.ActiveCases}
                  </Typography>

                  <Typography variant="caption">
                    Patients in Critical Condition:
                    {searchedCountry?.Serious_Critical}
                  </Typography>

                  <Typography variant="caption">
                    Total Recovered:{searchedCountry?.TotalRecovered}
                  </Typography>

                  <Typography variant="caption">
                    Total Deaths{searchedCountry?.TotalDeaths}
                  </Typography>

                  <Typography variant="caption">
                    Infection Risk:{searchedCountry?.Infection_Risk}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  );
}

export default Covid;
