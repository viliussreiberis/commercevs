import { makeStyles } from "@mui/styles";
import { red } from "@mui/material/colors";

const drawerWidth = 0;

export default makeStyles(() => ({
  appBar: {
    boxShadow: "none",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  title: {
    flexGrow: 1,
    alignItems: "center",
    display: "flex",
    textDecoration: "none",
  },
  image: {
    marginRight: "10px",
  },
  menuButton: {
    marginRight: "20px",
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: "relative",

    backgroundColor: red[50],
    "&:hover": {
      backgroundColor: red[100],
    },
    marginRight: "20px",
    marginLeft: 0,
    width: "100%",
  },
  searchIcon: {
    padding: "20px",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: "20px",
    // vertical padding + font size from searchIcon
    paddingLeft: "20px",

    width: "100%",
  },
}));
