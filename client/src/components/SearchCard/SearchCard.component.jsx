import React from "react";
import "../SearchCard/SearchCard.styles.scss";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    button: {
      margin: theme.spacing(1)
    },
    card: {
      maxWidth: 600,
      height: 475,
      borderRadius: "5%"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 400
    }
  })
);

const SearchCard = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [age, setAge] = React.useState("");
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const handleDateChange = date => {
    setSelectedDate(date);
  };
  const handleChange = event => {
    setAge(event.target.value);
  };
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h4" component="h4">
          Looking for an awesome event? Check out for available events.
        </Typography>
        <TextField
          id="outlined-basic"
          className={classes.textField}
          label="Location"
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          className={classes.textField}
          label="Event Name"
          margin="normal"
          variant="outlined"
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
            Age
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={age}
            onChange={handleChange}
            labelWidth={labelWidth}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Technology"}>Technology</MenuItem>
            <MenuItem value={"Busines"}>Business</MenuItem>
            <MenuItem value={"Agriculture"}>Agriculture</MenuItem>
            <MenuItem value={"Music"}>Music</MenuItem>
          </Select>
        </FormControl>
        <Button variant="outlined" color="primary" className={classes.button}>
          Search
        </Button>
      </CardContent>
    </Card>
  );
};

export default SearchCard;
