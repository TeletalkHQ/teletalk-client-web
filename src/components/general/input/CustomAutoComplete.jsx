import match from "src/autosuggest-highlight/match";
import parse from "src/autosuggest-highlight/parse";
import {
  Autocomplete,
  Box,
  ListItem,
  makeStyles,
  TextField,
  Tooltip,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  activityItem: { fontSize: 14, padding: "3px", direction: "ltr" },
}));

const CustomAutoComplete = ({
  activityInputValue,
  finalActivities,
  onInputChange,
}) => {
  const classes = useStyles();

  return (
    <>
      <Autocomplete
        inputValue={activityInputValue}
        onInputChange={(_e, value) => onInputChange(value)}
        id="grouped-demo"
        options={finalActivities}
        groupBy={(activity) => activity.header}
        getOptionLabel={(activity) => activity.headerContent}
        style={{ width: 300 }}
        size="small"
        renderInput={(params) => (
          <TextField
            variant="outlined"
            size="small"
            {...params}
            label={"activities"}
          />
        )}
        renderOption={({ headerContent, ...props }, { inputValue }) => {
          const matches = match(headerContent, inputValue);
          const parts = parse(headerContent, matches);

          return (
            <Tooltip title={headerContent} placement="top">
              <ListItem className={classes.activityItem} {...props}>
                <Box dir="ltr">
                  {parts.map((part, index) => (
                    <span
                      key={index}
                      style={{ fontWeight: part.highlight ? 700 : 400 }}
                    >
                      {part.text}
                    </span>
                  ))}
                </Box>
              </ListItem>
            </Tooltip>
          );
        }}
      />
    </>
  );
};

export default CustomAutoComplete;
