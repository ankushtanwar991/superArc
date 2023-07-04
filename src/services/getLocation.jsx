export const getLocation = (lat, lang) => {
  const apiKey = "AIzaSyBCloz5P5UwYCxbxCgFd7B3bi0AZLAg5CE";
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lang}&key=${apiKey}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      var res = data.plus_code.compound_code;
      res = res.substring(8);

      localStorage.setItem("city", res);
      localStorage.setItem("address", data.results[0].formatted_address);
    })
    .catch((err) => console.log(err));

  return;
};
