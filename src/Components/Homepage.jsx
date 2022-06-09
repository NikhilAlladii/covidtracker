import { Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
// import FlagImage from "../Images/logo-flag.png";
import axios from "axios";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// import required modules
import { Navigation } from "swiper";

import "./Homepage.css";
import moment from "moment";
import Showpdf from "./Showpdf";
import { Box } from "@mui/system";
import ShowPdfHindi from "./ShowPdfHindi";

function Homepage() {
  const [news, setNews] = useState([]);
  const [stateDetails, setStateDetails] = useState([]);
  const [showTab, setShowTab] = useState("English");
  const [countryData, setCountryData] = useState({});

  const getData = () =>
    axios
      .get(
        "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/news/get-coronavirus-news/1",
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
        console.log(res.data.news);
        setNews(res.data.news);
      });

  const getCountryData = () =>
    axios
      .get(
        "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/api-covid-data/reports/IND",
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
        console.log(res?.data);
        setStateDetails(res?.data);
      });

  const getSpecificCountryData = () => {
    axios
      .get(
        "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/country-report-iso-based/India/ind",
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
        console.log("separate country data", res.data[0]);
        setCountryData(res.data[0]);
      });
  };

  useEffect(() => {
    getData();
    getCountryData();
    getSpecificCountryData();
  }, []);

  return (
    <div>
      <Grid container spacing={2} className="my-3">
        <Grid item xs={4}>
          <div
            className="d-flex flex-column align-items-center justify-content-center py-5 px-3 activeCases"
            style={{ backgroundColor: "#a5c9fd", borderRadius: "20px" }}
          >
            <Typography
              sx={{
                fontSize: "2vw",
                fontWeight: "700",
                color: "#002c56",
              }}
            >
              Total Cases
            </Typography>
            <Typography
              sx={{
                fontSize: "2vw",
                fontWeight: "700",
                color: "#002c56",
              }}
            >
              {countryData?.TotalCases}
            </Typography>
          </div>
        </Grid>

        <Grid item xs={4}>
          <div
            className="d-flex flex-column align-items-center justify-content-center py-5 px-3"
            style={{ backgroundColor: "#9ae69c", borderRadius: "20px" }}
          >
            <Typography
              sx={{
                fontSize: "2vw",
                fontWeight: "700",
                color: "#015B25",
              }}
            >
              Total Recovered
            </Typography>
            <Typography
              sx={{
                fontSize: "2vw",
                fontWeight: "700",
                color: "#015B25",
              }}
            >
              {countryData?.TotalRecovered}
            </Typography>
          </div>
        </Grid>

        <Grid item xs={4}>
          <div
            className="d-flex flex-column align-items-center justify-content-center py-5 px-3"
            style={{ backgroundColor: "#ff8582", borderRadius: "20px" }}
          >
            <Typography
              sx={{
                fontSize: "2vw",
                fontWeight: "700",
                color: "#5A0502",
              }}
            >
              Total Deaths
            </Typography>
            <Typography
              sx={{
                fontSize: "2vw",
                fontWeight: "700",
                color: "#5A0502",
              }}
            >
              {countryData?.TotalDeaths}
            </Typography>
          </div>
        </Grid>
      </Grid>

      <Grid container spacing={2} className="my-3">
        <Grid item xs={12}>
          <div
            className="d-flex flex-column align-items-center justify-content-center py-4"
            style={{ backgroundColor: "#036ba0", borderRadius: "20px" }}
          >
            <Typography
              sx={{
                fontSize: "2vw",
                fontWeight: "700",
                color: "#FFFFFF",
              }}
            >
              Total Tests:-
            </Typography>
            <Typography
              sx={{
                fontSize: "2vw",
                fontWeight: "700",
                color: "#FFFFFF",
              }}
            >
              {countryData?.TotalTests}
            </Typography>
          </div>
        </Grid>
      </Grid>

      <div className="my-3">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          slidesPerGroup={4}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          {news.map((eachNews) => (
            <SwiperSlide key={eachNews?.news_id}>
              <Card
                onClick={(event) => (window.location.href = `${eachNews.link}`)}
                style={{ height: "40vh", cursor: "pointer" }}
                className="my-3"
              >
                <CardContent className="eachNewsContent">
                  <div className="d-flex align-items-center justify-content-between">
                    <img
                      src={eachNews?.urlToImage}
                      alt="FlagImage"
                      className="flagCovidImage"
                      style={{
                        width: "4vw",
                        height: "8vh",
                        borderRadius: "50%",
                      }}
                    />
                    <div className="newsDate">
                      <Typography variant="caption">
                        {eachNews?.pubDate
                          ? moment(eachNews?.pubDate).format("MMMM Do YYYY")
                          : null}
                      </Typography>
                    </div>
                  </div>
                  <div className="my-2 newsTitle">
                    <Typography variant="caption">
                      {eachNews?.title.length > 30
                        ? `${eachNews?.title.slice(0, 50)}...`
                        : ""}
                    </Typography>
                  </div>
                  <Typography
                    variant="body1"
                    dangerouslySetInnerHTML={{
                      __html:
                        eachNews?.content.length > 30
                          ? `${eachNews.content.slice(0, 100)}...`
                          : null,
                    }}
                  ></Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <hr />

      <div className="statesAccordian">
        <Accordion className="mb-3">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6" className="my-2">
              The Indian States Covid Data (Click here to See)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="table-responsive">
              <table
                class="table table-bordered statesTable"
                style={{ border: "2px solid #dee2e6" }}
              >
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="p-3"
                      style={{
                        fontWeight: "550",
                        color: "#009933",
                        fontSize: "18px",
                      }}
                    >
                      S.No
                    </th>
                    <th
                      scope="col"
                      className="p-3"
                      style={{
                        fontWeight: "550",
                        color: "#009933",
                        fontSize: "18px",
                      }}
                    >
                      State
                    </th>
                    <th
                      scope="col"
                      className="p-3"
                      style={{
                        fontWeight: "550",
                        color: "#009933",
                        fontSize: "18px",
                      }}
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="p-3"
                      style={{
                        fontWeight: "550",
                        color: "#009933",
                        fontSize: "18px",
                      }}
                    >
                      Active&nbsp;Cases
                    </th>
                    <th
                      scope="col"
                      className="p-3"
                      style={{
                        fontWeight: "550",
                        color: "#009933",
                        fontSize: "18px",
                      }}
                    >
                      Confirmed&nbsp;Cases
                    </th>
                    <th
                      scope="col"
                      className="p-3"
                      style={{
                        fontWeight: "550",
                        color: "#009933",
                        fontSize: "18px",
                      }}
                    >
                      Recovered
                    </th>
                    <th
                      scope="col"
                      className="p-3"
                      style={{
                        fontWeight: "550",
                        color: "#009933",
                        fontSize: "18px",
                      }}
                    >
                      Deaths
                    </th>
                    <th
                      scope="col"
                      className="p-3"
                      style={{
                        fontWeight: "550",
                        color: "#009933",
                        fontSize: "18px",
                      }}
                    >
                      Active&nbsp;Difference
                    </th>
                    <th
                      scope="col"
                      className="p-3"
                      style={{
                        fontWeight: "550",
                        color: "#009933",
                        fontSize: "18px",
                      }}
                    >
                      Confirmed&nbsp;Difference
                    </th>
                    <th
                      scope="col"
                      className="p-3"
                      style={{
                        fontWeight: "550",
                        color: "#009933",
                        fontSize: "18px",
                      }}
                    >
                      Deaths&nbsp;Difference
                    </th>
                    <th
                      scope="col"
                      className="p-3"
                      style={{
                        fontWeight: "550",
                        color: "#009933",
                        fontSize: "18px",
                      }}
                    >
                      Recovery&nbsp;Proporation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stateDetails?.map((state, index) => (
                    <tr>
                      <td
                        className="p-3"
                        style={{
                          fontWeight: "550",
                          color: "#0f70ce",
                          fontSize: "16px",
                        }}
                      >
                        {index++}
                      </td>
                      <td
                        className="p-3"
                        style={{
                          fontWeight: "550",
                          color: "#0f70ce",
                          fontSize: "16px",
                        }}
                      >
                        {state?.province}
                      </td>
                      <td
                        className="p-3"
                        style={{
                          fontWeight: "550",
                          color: "#0f70ce",
                          fontSize: "16px",
                        }}
                      >
                        {state?.date}
                      </td>
                      <td
                        className="p-3"
                        style={{
                          fontWeight: "550",
                          color: "#0f70ce",
                          fontSize: "16px",
                        }}
                      >
                        {state?.active}
                      </td>
                      <td
                        className="p-3"
                        style={{
                          fontWeight: "550",
                          color: "#0f70ce",
                          fontSize: "16px",
                        }}
                      >
                        {state?.confirmed}
                      </td>
                      <td
                        className="p-3"
                        style={{
                          fontWeight: "550",
                          color: "#0f70ce",
                          fontSize: "16px",
                        }}
                      >
                        {state?.recovered}
                      </td>
                      <td
                        className="p-3"
                        style={{
                          fontWeight: "550",
                          color: "#0f70ce",
                          fontSize: "16px",
                        }}
                      >
                        {state?.deaths}
                      </td>
                      <td
                        className="p-3"
                        style={{
                          fontWeight: "550",
                          color: "#0f70ce",
                          fontSize: "16px",
                        }}
                      >
                        {state?.active_diff}
                      </td>
                      <td
                        className="p-3"
                        style={{
                          fontWeight: "550",
                          color: "#0f70ce",
                          fontSize: "16px",
                        }}
                      >
                        {state?.confirmed_diff}
                      </td>
                      <td
                        className="p-3"
                        style={{
                          fontWeight: "550",
                          color: "#0f70ce",
                          fontSize: "16px",
                        }}
                      >
                        {state?.deaths_diff}
                      </td>
                      <td
                        className="p-3"
                        style={{
                          fontWeight: "550",
                          color: "#0f70ce",
                          fontSize: "16px",
                        }}
                      >
                        {state?.Recovery_Proporation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>

      <hr />
      <div className="d-flex align-items-center justify-content-between my-3">
        <div>
          <Typography variant="h6">Awareness</Typography>
        </div>
        <Box className="d-flex chooseLanguageTab">
          <Box
            onClick={() => {
              setShowTab("English");
            }}
          >
            <Typography
              style={{
                backgroundColor: showTab === "English" ? "#0f70ce" : "#ffffff",
                borderTopLeftRadius: showTab === "English" ? "10px" : "10px",
                borderBottomLeftRadius: showTab === "English" ? "10px" : "10px",
                color: showTab === "English" ? "#ffffff" : null,
              }}
              className="px-3 py-2"
            >
              English
            </Typography>
          </Box>
          <Box
            onClick={() => {
              setShowTab("Hindi");
            }}
          >
            <Typography
              style={{
                backgroundColor: showTab === "Hindi" ? "#0f70ce" : "#ffffff",
                borderTopRightRadius: showTab === "Hindi" ? "10px" : "10px",
                borderBottomRightRadius: showTab === "Hindi" ? "10px" : "10px",
                color: showTab === "Hindi" ? "#ffffff" : null,
              }}
              className="px-3 py-2"
            >
              Hindi
            </Typography>
          </Box>
        </Box>
      </div>

      {showTab === "English" ? (
        <>
          <Showpdf />
        </>
      ) : null}
      {showTab === "Hindi" ? (
        <>
          <ShowPdfHindi />
        </>
      ) : null}
    </div>
  );
}

export default Homepage;
