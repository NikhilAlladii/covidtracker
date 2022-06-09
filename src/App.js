import { Container } from "@mui/material";
import Navbar from "./Components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Homepage from "./Components/Homepage";
import Vaccine from "./Components/Vaccine";
import Treatment from "./Components/Treatment";
import News from "./Components/News";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import "./App.css";
import Covid from "./Components/Covid";
import { useEffect, useState } from "react";
import GoToLogin from "./Components/GoToLogin";

function App() {
  const [login, setLogin] = useState(false);

  function moveToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    let forLogout = localStorage.getItem("CheckLogin");
    if (forLogout === "SuccessfullyLoged") {
      setLogin(true);
    }
  }, [login]);

  return (
    <BrowserRouter>
      <div className="App" style={{ backgroundColor: "#eef3f7" }}>
        <Container maxWidth="lg">
          <Navbar />

          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route exact path="/covid19">
              {login === true ? <Covid /> : <GoToLogin />}
            </Route>
            <Route exact path="/vaccine">
              <Vaccine />
            </Route>
            <Route exact path="/treatment">
              <Treatment />
            </Route>
            <Route exact path="/news">
              <News />
            </Route>
          </Switch>

          {login === true ? (
            <div
              className="scrollToTopContainer d-flex align-items-center justify-content-center"
              onClick={moveToTop}
            >
              <FileUploadRoundedIcon className="scrollToTop" />
            </div>
          ) : null}
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
