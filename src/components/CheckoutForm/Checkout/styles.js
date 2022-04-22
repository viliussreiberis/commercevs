import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },

  layout: {
    marginTop: "15%",
    width: "auto",
    marginLeft: "20px",
    marginRight: "20px",
  },

  toolbar: {
    marginTop: "70px",
  },
  paper: {
    marginTop: "20px",
    marginBottom: "20px",
    padding: "20px",
  },
  stepper: {
    padding: "20px",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: "20px",
    marginLeft: "20px",
  },
  divider: {
    margin: "20px 0",
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
