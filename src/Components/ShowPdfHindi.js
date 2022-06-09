import React from "react";
// import pdf1 from "../Images/pdf1.pdf";

import ImageHindi1 from "../Images/imagehindi1.png";
import ImageHindi2 from "../Images/imagehindi2.png";

import ImageHindi3 from "../Images/imagehindi3.png";

import ImageHindi4 from "../Images/imagehindi4.png";

import { Grid } from "@mui/material";

import "./Showpdf.css";

function ShowPdfHindi() {
  return (
    <div>
      <Grid
        container
        className="d-flex align-items-center justify-content-between"
        rowSpacing={5}
        columnSpacing={5}
      >
        <Grid item xs="4">
          <a
            href="https://www.mohfw.gov.in/pdf/socialdistancingHindi.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={ImageHindi1}
              className="showPdfZoom"
              alt="pdf1"
              style={{ width: "100%" }}
            />
          </a>
        </Grid>
        <Grid item xs="4">
          <a
            href="https://www.mohfw.gov.in/pdf/FINAL_14_03_2020_Hindi.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={ImageHindi2}
              className="showPdfZoom"
              alt="pdf2"
              style={{ width: "100%" }}
            />
          </a>
        </Grid>
        <Grid item xs="4">
          <a
            href="https://www.mohfw.gov.in/pdf/ProtectivemeasuresHin.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={ImageHindi3}
              className="showPdfZoom"
              alt="pdf3"
              style={{ width: "100%" }}
            />
          </a>
        </Grid>
        <Grid item xs="4">
          <a
            href="https://www.mohfw.gov.in/pdf/Poster_Corona_ad_Hin.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={ImageHindi4}
              className="showPdfZoom"
              alt="pdf4"
              style={{ width: "100%" }}
            />
          </a>
        </Grid>
      </Grid>
    </div>
  );
}

export default ShowPdfHindi;
