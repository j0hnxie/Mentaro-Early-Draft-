import { Redirect, Route, Switch } from "react-router-dom";
import DepressionForm from "./components/DepressionForm";
import AnxietyForm from "./components/AnxietyForm";
import DailyForm from "./components/DailyForm";
import GraphPage from "./components/GraphPage";
import SignIn from "./components/SignIn";
import UserHomePage from "./components/UserHomePage";
import HomePage from "./components/HomePage";
import BreathingExercise from "./components/BreathingExercise";
import useToken from "./components/useToken";
import SignUp from "./components/SignUp";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useLocation } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const { token, setToken, clearToken } = useToken();
  const location = useLocation();
  useEffect(() => {
    console.log(token);
  }, [token]);
  useEffect(() => {
    console.log("runs again");
  }, []);

  const classes = useStyles();

  const handleSignOut = () => {
    clearToken();
  };

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Mentaro
            </Typography>
            {location.pathname === "/" ? (
              <>
                <Button color="inherit" href="/#about">
                  About
                </Button>
                <Button color="inherit" href="/#form">
                  Sample Form
                </Button>
                <Button color="inherit" href="/#services">
                  Features
                </Button>
                <Button color="inherit" href="/#contact">
                  Contact Us
                </Button>
              </>
            ) : (
              <></>
            )}
            {token ? (
              <>
                <Button color="inherit" href="/GraphPage">
                  Graph Page
                </Button> {location.pathname !== "/UserHomePage" ? (
                  <Button color="inherit" href="/UserHomePage">
                    User Home Page
                  </Button>
                ) : (
                  <Button color="inherit" href="/">
                    Home Page
                  </Button>
                )}
                <Button color="inherit" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <Button color="inherit" href="/SignIn">
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
      <div>
        <Switch>
          <Route exact path="/SignUp/:companyId/:userId">
            {({ match }) => <SignUp match={match} setToken={setToken} />}
          </Route>

          <Route path="/SignIn">
            {token ? (
              <Redirect to="/UserHomePage" />
            ) : (
              <SignIn token={token} setToken={setToken} />
            )}
          </Route>

          <Route path="/UserHomePage">
            {token ? <UserHomePage/> : <Redirect to="/SignIn" />}
          </Route>
          <Route exact path="/DepressionForm">
            {token ? <DepressionForm /> : <Redirect to="/SignIn" />}
          </Route>
          <Route exact path="/AnxietyForm">
            {token ? <AnxietyForm /> : <Redirect to="/SignIn" />}
          </Route>
          <Route exact path="/DailyForm">
            {token ? <DailyForm /> : <Redirect to="/SignIn" />}
          </Route>
          <Route exact path="/GraphPage">
            {token ? <GraphPage /> : <Redirect to="/SignIn" />}
          </Route>
          <Route exact path="/BreathingExercise">
            {token ? <BreathingExercise /> : <Redirect to="/SignIn" />}
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/">
            <h1>ARE YOU LOST? PAGE DOESN'T EXIST</h1>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
