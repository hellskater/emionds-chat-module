import { Container, makeStyles, Typography } from "@material-ui/core";
import { ExitToApp, Home, Person, Mail } from "@material-ui/icons";

import { useHistory, Link } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    color: "white",
    paddingTop: theme.spacing(10),
    backgroundColor: theme.palette.primary.main,
    position: "sticky",
    top: 0,
    [theme.breakpoints.up("sm")]: {
      backgroundColor: "white",
      color: "#555",
      border: "1px solid #ece7e7",
    },
  },
  item: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      marginBottom: theme.spacing(1),
      cursor: "pointer",
    },
    "&:hover": {
      backgroundColor: "lightgray",
    },
    padding: theme.spacing(2)
  },

  icon: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      fontSize: "18px",
    },
  },
  text: {
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

const Leftbar = () => {
  const history = useHistory();
  const { oktaAuth, authState } = useOktaAuth();
  console.log(authState);

  const classes = useStyles();

  if (!authState) return null;

  const login = async () => history.push("/login");

  const logout = async () => oktaAuth.signOut();

  const button = !authState.isAuthenticated ? (
    <div className={classes.item} onClick={login}>
      <ExitToApp className={classes.icon} />
      <Typography className={classes.text}>Login</Typography>
    </div>
  ) : (
    <div className={classes.item} onClick={logout}>
      <ExitToApp className={classes.icon} />
      <Typography className={classes.text}>Logout</Typography>
    </div>
  );

  return (
    <Container className={classes.container}>
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <div className={classes.item}>
          <Home className={classes.icon} />
          <Typography className={classes.text}>Home</Typography>
        </div>
      </Link>

      <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
        <div className={classes.item}>
          <Person className={classes.icon} />
          <Typography className={classes.text}>Profile</Typography>
        </div>
      </Link>

      <Link to="/messages" style={{ textDecoration: "none", color: "inherit" }}>
        <div className={classes.item}>
          <Mail className={classes.icon} />
          <Typography className={classes.text}>Messages</Typography>
        </div>
      </Link>

      {button}
    </Container>
  );
};

export default Leftbar;
