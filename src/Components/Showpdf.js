import React from "react";
// import pdf1 from "../Images/pdf1.pdf";
import Image1 from "../Images/image1.png";
import Image2 from "../Images/image2.png";
import Image3 from "../Images/image3.png";
import Image4 from "../Images/image4.png";
import { Grid } from "@mui/material";

import "./Showpdf.css";

function Showpdf() {
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
            href="https://www.mohfw.gov.in/pdf/socialdistancingEnglish.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={Image1}
              className="showPdfZoom"
              alt="pdf1"
              style={{ width: "100%" }}
            />
          </a>
        </Grid>
        <Grid item xs="4">
          <a
            href="https://www.mohfw.gov.in/pdf/FINAL_14_03_2020_ENg.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={Image2}
              className="showPdfZoom"
              alt="pdf2"
              style={{ width: "100%" }}
            />
          </a>
        </Grid>
        <Grid item xs="4">
          <a
            href="https://www.mohfw.gov.in/pdf/ProtectivemeasuresEng.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={Image3}
              className="showPdfZoom"
              alt="pdf3"
              style={{ width: "100%" }}
            />
          </a>
        </Grid>
        <Grid item xs="4">
          <a
            href="https://www.mohfw.gov.in/pdf/Poster_Corona_ad_Eng.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={Image4}
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

export default Showpdf;
