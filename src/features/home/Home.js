import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import LocalHospital from "@material-ui/icons/LocalHospital";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import OtwoForm from "../../components/OtwoForm";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(10, 0, 6),
  },
}));

const Home = () => {
  const classes = useStyles();
  const [result, setResult] = useState(0);

  const calculate = ({ expMinVol, fiO2 }) => {
    // 5kg 200bar = 1000l
    // O2 Consumption = (ExpMinVol + 3l/min) * (FiO2 - 20.9) / 79.1
    const vol = parseInt(expMinVol) + 3;
    const fi = parseInt(fiO2) - 20.9;

    return ((vol * fi) / 79.1).toFixed(2);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <LocalHospital className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Beräkna O2 åtgång
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Paper elevation={3}>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                {result} l/min
              </Typography>
            </Paper>
            <Typography variant="h6" gutterBottom>
              Ange värden
            </Typography>
            <OtwoForm
              callback={(values) => setResult(calculate(values))}
              clear={() => setResult(0)}
            />
          </Container>
        </div>
      </main>
    </>
  );
};

export default Home;
