import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
// import FlagImage from "../Images/logo-flag.png";
import { Pagination } from "react-rainbow-components";
import moment from "moment";
import "./Treatment.css";

function Treatment() {
  const [healthNews, setHealthNews] = useState([]);
  const [activePage, setActivePage] = useState(1);

  const handlePaginationChange = (event, page) => {
    setActivePage(page);
  };

  // const getTreatmentData = () => {
  //   axios
  //     .get(
  //       `https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/news/get-health-news/${activePage}`,
  //       {
  //         headers: {
  //           "X-RapidAPI-Host":
  //             "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
  //           "X-RapidAPI-Key":
  //             "207bb68696msh7c2ab8791bda0adp103defjsn290b1ec659d4",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log("response is", res.data.news);
  //       setHealthNews(res.data.news);
  //     });
  // };

  const getTreatmentData = useCallback(() => {
    axios
      .get(
        `https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/news/get-health-news/${activePage}`,
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

  useEffect(() => {
    getTreatmentData();
  });

  return (
    <div style={{ position: "relative" }}>
      <Grid
        container
        rowSpacing={2}
        columnSpacing={2}
        className="healthContainer"
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
                      {news?.pubDate ? moment(news?.pubDate).format("L") : null}
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
  );
}

export default Treatment;
