import React, { useState, useEffect } from "react";
import FlagImage from "../Images/logo-flag.png";
import Grid from "@mui/material/Grid";
import "./Navbar.css";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  px: 3,
  py: 2,
  borderRadius: "10px",
};

function Navbar() {
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openSignIn, setOpenSignIn] = useState(false);
  const handleOpenSignIn = () => setOpenSignIn(true);
  const handleCloseSignIn = () => setOpenSignIn(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [toCheckLogin, setToCheckLogin] = useState("");

  const [matchPassword, setMatchPassword] = useState(false);
  const [matchLoginPassword, setMatchLoginPassword] = useState(false);

  console.log("name is", name);

  const handleSignUp = () => {
    const SignUpData = {
      name: name,
      email: email,
      password: password,
    };

    if (password === confirmPassword) {
      // Put the object into storage
      localStorage.setItem("SignUpData", JSON.stringify(SignUpData));
      setOpen(false);
      setOpenSignIn(true);

      // Retrieve the object from storage
      var SignUpDataNew = localStorage.getItem("SignUpData");

      console.log("retrievedObject: ", JSON.parse(SignUpDataNew));
    } else {
      setMatchPassword(true);
    }

    console.log("SignUp data", SignUpData);
  };

  const handleLogin = () => {
    var SignUpDataNew = localStorage.getItem("SignUpData");

    let retrievedObject = JSON.parse(SignUpDataNew);
    let forLoginEmail = retrievedObject.email;
    let forLoginPassword = retrievedObject.password;

    if (loginEmail === forLoginEmail && loginPassword === forLoginPassword) {
      console.log("successfully login");
      window.location.reload();
      setOpenSignIn(false);
      localStorage.setItem("CheckLogin", "SuccessfullyLoged");
      let forLogout = localStorage.getItem("CheckLogin");
      console.log("logout is", forLogout);
      if (forLogout === "SuccessfullyLoged") {
        setToCheckLogin("login");
      }
    } else {
      setMatchLoginPassword(true);
    }
  };

  useEffect(() => {
    let forLogout = localStorage.getItem("CheckLogin");
    console.log("logout is", forLogout);
    if (forLogout === "SuccessfullyLoged") {
      setToCheckLogin("login");
    }
  }, []);

  return (
    <div>
      <Grid container className="navbarContainer">
        <Grid item xs={2} className="d-flex align-items-center">
          <div className="flagImage" onClick={() => history.push("/")}>
            <img
              src={FlagImage}
              alt="FlagImage"
              style={{ width: "3vw", height: "5vh", borderRadius: "50%" }}
            />
          </div>
          <Typography onClick={() => history.push("/")}>
            &nbsp;&nbsp;Covid Tracker
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <div>
            <ul className="d-flex navbarItems mb-0 justify-content-between">
              <li onClick={() => history.push("/covid19")}>
                <Typography>Covid-19</Typography>
              </li>
              <li onClick={() => history.push("/vaccine")}>
                <Typography>Vaccine</Typography>
              </li>
              <li onClick={() => history.push("/treatment")}>
                <Typography>Health</Typography>
              </li>
              <li onClick={() => history.push("/news")}>
                <Typography>News</Typography>
              </li>
            </ul>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="d-flex mb-0 justify-content-between">
            <div></div>
            <div className="d-flex align-items-center">
              {toCheckLogin === "login" ? (
                <Typography
                  onClick={() => {
                    localStorage.removeItem("CheckLogin");
                    setToCheckLogin(false);
                    window.location.reload();
                  }}
                >
                  Logout
                </Typography>
              ) : (
                <div className="d-flex">
                  <Typography onClick={handleOpen}>SignUp&nbsp;</Typography>/
                  <Typography onClick={handleOpenSignIn}>
                    &nbsp;SignIn
                  </Typography>
                </div>
              )}
            </div>
          </div>
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5" className="text-center my-2">
            SignUp
          </Typography>

          <TextField
            className="my-2 w-100"
            id="demo-helper-text-misaligned-no-helper"
            label="Name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />

          <TextField
            className="my-2 w-100"
            id="demo-helper-text-misaligned-no-helper"
            label="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />

          <TextField
            className="my-2 w-100"
            id="demo-helper-text-misaligned-no-helper"
            hintText="Password"
            label="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />

          <TextField
            className="my-2 w-100"
            id="demo-helper-text-misaligned-no-helper"
            label="Confirm Password"
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
          />

          {matchPassword === true && (
            <Typography variant="caption">
              Please match the Password and Confirm Password
            </Typography>
          )}

          <Button
            variant="contained"
            color="success"
            className="w-100 my-2 mb-3 py-2"
            onClick={handleSignUp}
          >
            Submit
          </Button>
        </Box>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={handleCloseSignIn}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5" className="text-center my-2">
            Login
          </Typography>
          <TextField
            className="my-2 w-100"
            id="demo-helper-text-misaligned-no-helper"
            label="Email"
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
          <TextField
            className="my-2 w-100"
            id="demo-helper-text-misaligned-no-helper"
            label="Password"
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />

          {matchLoginPassword && (
            <Typography variant="caption">
              Please match the Credentials
            </Typography>
          )}

          <Button
            variant="contained"
            color="success"
            className="w-100 my-3 mb-3 py-2"
            onClick={handleLogin}
          >
            LogIn
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Navbar;
