import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Pagination } from "react-rainbow-components";
import moment from "moment";
import "./News.css";

function News() {
  const [showTab, setShowTab] = useState("English");

  const [healthNews, setHealthNews] = useState([]);
  const [covidNews, setCovidNews] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [activePageNews, setActivePageNews] = useState(1);

  const handlePaginationChange = (event, page) => {
    setActivePage(page);
  };

  const handlePaginationNewsChange = (event, page) => {
    setActivePageNews(page);
  };

  // const getTreatmentData = () => {
  //   return axios.get(
  //     `https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/news/get-vaccine-news/${activePage}`,
  //     {
  //       headers: {
  //         "X-RapidAPI-Host":
  //           "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
  //         "X-RapidAPI-Key":
  //           "207bb68696msh7c2ab8791bda0adp103defjsn290b1ec659d4",
  //       },
  //     }
  //   );
  // };

  const getTreatmentData = useCallback(() => {
    axios
      .get(
        `https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/news/get-vaccine-news/${activePage}`,
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
        console.log("response is", res.data.news);
        setHealthNews(res.data.news);
      })
      .catch((err) => console.error(err));
  }, [activePage]);

  const getVaccineData = useCallback(() => {
    axios
      .get(
        `https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/news/get-vaccine-news/${activePageNews}`,
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
        setCovidNews(res.data.news);
      })
      .catch((err) => console.error(err));
  }, [activePageNews]);

  useEffect(() => {
    getTreatmentData();
  });

  useEffect(() => {
    getVaccineData();
  });
  return (
    <div>
      <Box className="d-flex align-items-center justify-content-between flex-column">
        <Typography className="mb-2">Select the News Tab</Typography>
        <Box className="d-flex chooseLanguageTab align-items-center justify-content-center mb-4">
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
              Vaccine News
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
              Covid News
            </Typography>
          </Box>
        </Box>
      </Box>

      {showTab === "English" && (
        <div style={{ position: "relative" }}>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={2}
            className="healthContainerNews"
          >
            {healthNews?.map((news) => (
              <Grid item lg="4" xl="4" md="6" sm="12" xs="12">
                <Card style={{ height: "50vh" }}>
                  <CardContent>
                    <Box>
                      <img
                        src={news?.urlToImage}
                        alt="FlagImage"
                        style={{ width: "100%", height: "20vh" }}
                      />
                    </Box>

                    <Box>
                      <Typography className="my-2">
                        {/* {news?.title} */}
                        {news?.title.length > 70
                          ? `${news.title.slice(0, 70)}...`
                          : news.title}
                      </Typography>
                      <Typography variant="caption">
                        {/* {news?.content} */}
                        {news?.content.length > 90
                          ? `${news.content.slice(0, 90)}...`
                          : news.content}
                        &nbsp;&nbsp;&nbsp;
                        <small
                          style={{
                            color: "blue",
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                          onClick={(event) =>
                            (window.location.href = `${news?.link}`)
                          }
                        >
                          viewmore
                        </small>
                      </Typography>
                      <Box className="d-flex align-items-center justify-content-between my-3">
                        <Typography variant="caption">
                          Reference:-{news?.reference}
                        </Typography>
                        <Typography variant="caption">
                          Published Date:-
                          {news?.pubDate
                            ? moment(news?.pubDate).format("L")
                            : null}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box className="paginationSetup py-3">
            <Pagination
              className="rainbow-m_auto"
              pages={6}
              activePage={activePage}
              onChange={handlePaginationChange}
            />
          </Box>
        </div>
      )}
      {showTab === "Hindi" && (
        <div style={{ position: "relative" }}>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={2}
            className="healthContainerNews"
          >
            {covidNews?.map((news) => (
              <Grid item lg="4" xl="4" md="6" sm="12" xs="12">
                <Card style={{ height: "50vh" }}>
                  <CardContent>
                    <Box>
                      <img
                        src={news?.urlToImage}
                        alt="FlagImage"
                        style={{ width: "100%", height: "20vh" }}
                      />
                    </Box>

                    <Box>
                      <Typography className="my-2">
                        {/* {news?.title} */}
                        {news?.title.length > 70
                          ? `${news.title.slice(0, 70)}...`
                          : news.title}
                      </Typography>
                      <Typography variant="caption">
                        {/* {news?.content} */}
                        {news?.content.length > 90
                          ? `${news.content.slice(0, 90)}...`
                          : news.content}
                        &nbsp;&nbsp;&nbsp;
                        <small
                          style={{
                            color: "blue",
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                          onClick={(event) =>
                            (window.location.href = `${news?.link}`)
                          }
                        >
                          viewmore
                        </small>
                      </Typography>
                      <Box className="d-flex align-items-center justify-content-between my-3">
                        <Typography variant="caption">
                          Reference:-{news?.reference}
                        </Typography>
                        <Typography variant="caption">
                          Published Date:-
                          {news?.pubDate
                            ? moment(news?.pubDate).format("L")
                            : null}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box className="paginationSetup py-3">
            <Pagination
              className="rainbow-m_auto"
              pages={6}
              activePage={activePageNews}
              onChange={handlePaginationNewsChange}
            />
          </Box>
        </div>
      )}
    </div>
  );
}

export default News;
