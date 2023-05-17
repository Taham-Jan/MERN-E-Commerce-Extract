import { Button as MuiButton } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  customButton: {
    fontFamily:"'Ikaros', sans-serif  !important ",
   fontSize:"1vmax !important",
    borderColor: "white !important ",
    color: "#242424 !important ",
    fontWeight: "550 !important ",
    width: "100% !important",
    padding: "1rem !important ",
    "&:hover": {
      backgroundColor: "#f3cb6c !important ",
    },
    "@media screen and (max-width: 900px)": {
      fontSize:"1.5vmax !important",
    },
  },
});

function MyButton(props) {
  const classes = useStyles();

  return (
    <>
      {props.endIcon ? (
        <MuiButton endIcon={props.endIcon} className={classes.customButton}>
          {props.text}
        </MuiButton>
      ) : (
        <MuiButton className={classes.customButton}>{props.text}</MuiButton>
      )}
    </>
  );
}

export default MyButton;
