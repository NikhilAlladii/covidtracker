import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { Pagination } from "react-rainbow-components";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Vaccine.css";
import moment from "moment";
import Select from "react-select";

function Vaccine() {
  const [activePage, setActivePage] = useState(1);
  const [allVaccineData, setAllVaccineData] = useState([]);
  const [trimedName, setTrimedName] = useState("");
  const [particularVaccineData, setParticularVaccineData] = useState([]);
  const [selectView, setSelectedView] = useState("GridView");

  const lastItem = activePage * 10;
  const firstItem = lastItem - 10;
  let num = 1;
  let numTwo = 1;

  const handlePaginationChange = (event, page) => {
    setActivePage(page);
  };

  const getWorldData = () => {
    axios
      .get(
        "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/vaccines/get-all-vaccines",
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
        // console.log("response is", res.data);
        setAllVaccineData(res.data);
        getWorldDataSpecific(res.data[0]);
      });
  };

  // console.log("rf", vaccineData);

  const getWorldDataSpecific = (eachVaccine) => {
    // console.log("data and vaccine is", eachVaccine);
    axios
      .get(
        `https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/vaccines/get-vaccines/${eachVaccine?.trimedCategory}/${eachVaccine?.trimedName}`,
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
        // console.log("response is", res.data);
        setParticularVaccineData(res.data[0]);
        setTrimedName(res.data[0]?.trimedName);
      });
  };

  // console.log("particular data is", particularVaccineData);

  const options = [
    { value: "GridView", label: "Grid View" },
    { value: "TableView", label: "Table View" },
  ];

  const handleChange = (value) => {
    console.log("value is", value.value);
    setSelectedView(value.value);
  };

  useEffect(() => {
    getWorldData();
  }, []);
  return (
    <div>
      <Box className="vaccinePageHeader d-flex align-items-center justify-content-between">
        <div></div>
        <Typography variant="h5" className="py-3">
          Vaccination Details
        </Typography>
        <Box>
          <Select
            value={selectView}
            onChange={handleChange}
            options={options}
            placeholder={selectView}
            defaultValue={{ value: "GridView", label: "Grid View" }}
          />
        </Box>
      </Box>
      <Grid container style={{ position: "relative" }}>
        <Grid
          xl="7"
          lg="7"
          md="7"
          className="leftContainer"
          style={{ position: "relative" }}
        >
          {selectView === "GridView" ? (
            <Grid
              container
              rowSpacing={2}
              columnSpacing={2}
              className="px-4 leftContainerTop my-1"
            >
              {allVaccineData.slice(firstItem, lastItem).map((eachVaccine) => (
                <Grid item xl="4" lg="4" md="6" sm="12" xs="12">
                  <Card
                    className=""
                    style={{
                      height: "35vh",
                      cursor: "pointer",
                      // border:
                      //   trimedName === eachVaccine.trimedName
                      //     ? "5px solid rgb(216, 237, 255"
                      //     : null,
                      backgroundColor:
                        trimedName === eachVaccine.trimedName
                          ? "rgb(216, 237, 255"
                          : null,
                    }}
                    onClick={() => {
                      getWorldDataSpecific(eachVaccine);
                      setTrimedName(eachVaccine?.trimedName);
                    }}
                  >
                    <CardContent>
                      <Box className="d-flex align-items-center justify-content-between">
                        <Typography className="categoryNameTop">
                          {num++}.{eachVaccine?.category}
                        </Typography>
                        <Typography
                          variant="caption"
                          style={{ fontSize: "9px", fontWeight: "600" }}
                        >
                          Last&nbsp;Update:-
                          <br />
                          {eachVaccine?.lastUpdated
                            ? moment(eachVaccine?.lastUpdated).format("L")
                            : null}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography className="categoryName my-2">
                          Phase: {eachVaccine?.phase}
                        </Typography>

                        <Typography variant="caption">
                          {/* {eachVaccine?.developerResearcher} */}
                          {eachVaccine?.developerResearcher.length > 30
                            ? `${eachVaccine.developerResearcher.slice(
                                0,
                                50
                              )}...`
                            : eachVaccine.developerResearcher}
                        </Typography>
                        <br />
                        <Typography variant="caption">
                          TrimedName:-
                          {eachVaccine?.trimedName.length > 30
                            ? `${eachVaccine.trimedName.slice(0, 30)}...`
                            : eachVaccine.trimedName}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box className="mb-5 tableViewContainer">
              {selectView === "TableView" &&
                allVaccineData.slice(firstItem, lastItem).map((eachVaccine) => (
                  <Box
                    className="p-3 py-2 leftContainerTable"
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        trimedName === eachVaccine.trimedName
                          ? "rgb(216, 237, 255"
                          : null,
                    }}
                    onClick={() => getWorldDataSpecific(eachVaccine)}
                  >
                    <Box className="d-flex align-items-center justify-content-between">
                      <Typography>
                        {numTwo++}.{eachVaccine?.category}
                      </Typography>
                      <Typography>
                        Last Update:-{" "}
                        {eachVaccine?.lastUpdated
                          ? moment(eachVaccine?.lastUpdated).format("L")
                          : null}
                      </Typography>
                    </Box>
                    <Grid container className="my-2">
                      <Grid item xl="4" md="4" sm="4">
                        <Typography variant="caption">
                          Phase:-{eachVaccine?.phase}
                        </Typography>
                      </Grid>
                      <Grid item xl="4" md="4" sm="4">
                        <Typography variant="caption">
                          Trained Category:-
                          {eachVaccine?.trimedCategory.length > 10
                            ? `${eachVaccine.trimedCategory.slice(0, 10)}...`
                            : eachVaccine.trimedCategory}
                        </Typography>
                      </Grid>
                      <Grid item xl="4" md="4" sm="4">
                        <Typography variant="caption">
                          Trained Name:-
                          {eachVaccine?.trimedName.length > 10
                            ? `${eachVaccine.trimedName.slice(0, 10)}...`
                            : eachVaccine.trimedName}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
            </Box>
          )}

          <Box className="paginationSetup py-3">
            <Pagination
              className="rainbow-m_auto"
              pages={Math.ceil(allVaccineData.length / 10)}
              activePage={activePage}
              onChange={handlePaginationChange}
            />
          </Box>
        </Grid>

        <Grid xl="5" lg="5" md="5" className="px-4 py-4 rightSideContainer">
          <Box className="d-flex align-items-center justify-content-between">
            <Typography>Category:-{particularVaccineData?.category}</Typography>
            <Typography variant="caption">
              Last Update:-
              {particularVaccineData?.lastUpdated
                ? moment(particularVaccineData?.lastUpdated).format("L")
                : null}
            </Typography>
          </Box>

          <Box>
            <Typography className="mt-5">
              Description:-{particularVaccineData?.description}
            </Typography>
            <Typography className="my-2">
              DeveloperResearcher:-{particularVaccineData?.developerResearcher}
            </Typography>
            <Typography className="my-2">
              Current Phase:-{particularVaccineData?.phase}
            </Typography>
            <Typography className="my-2">
              Next Steps:-{particularVaccineData?.nextSteps}
            </Typography>
            <Typography>
              ClinicalTrialsForCovid19:-
              {particularVaccineData?.clinicalTrialsForCovid19}
            </Typography>
            {particularVaccineData?.publishedResults && (
              <Box
                onClick={(event) =>
                  (window.location.href = `${particularVaccineData?.publishedResults[0]}`)
                }
              >
                <Typography variant="caption">
                  click here to go for published webpages
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default Vaccine;
