import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

export const Sample = () => {
  const apiKey = "AIzaSyBCloz5P5UwYCxbxCgFd7B3bi0AZLAg5CE";
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = (str) => {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${str}&key=${apiKey}`;

    fetch(url)
      .then((res) => res.json())
      .then((response) => {
        if (response.status === "OK") {
          response.predictions.forEach((e) => {
            setSuggestions([...suggestions, e.description]);
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <br />
      <Autocomplete
        options={suggestions}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Address"
            multiline
            rows={2}
            onChange={(e) => getSuggestions(e.target.value)}
            placeholder="Enter Your Location"
          />
        )}
      />
    </>
  );
};
