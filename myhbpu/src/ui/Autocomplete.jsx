import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const ComboBox = ({ inputname, onChange }) => {
  const buildings = [
    "腾龙",
    "议程",
    "西门体育馆",
    "J栋教学楼",
    "东门",
    "静园食堂",
    "东门体育馆",
    "智慧大楼",
  ];
  return (
    <Autocomplete
      disablePortal
      options={buildings}
      sx={{ width: 300 }}
      onChange={(e, value) => onChange(e, value)}
      renderInput={(params) => <TextField {...params} label={inputname} />}
    />
  );
};
export default ComboBox;
