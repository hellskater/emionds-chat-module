import { Grid, makeStyles } from "@material-ui/core";
import Feed from "../components/Feed";
import Leftbar from "../components/Leftbar";
import Navbar from "../components/Navbar";

// const useStyles = makeStyles((theme) => ({
//   right: {
//     [theme.breakpoints.down("sm")]: {
//       display: "none",
//     },
//   },
// }));

const Home = () => {
  // const classes = useStyles();
  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item sm={2} xs={2}>
          <Leftbar />
        </Grid>
        <Grid item sm={7} xs={10}>
          <Feed />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
