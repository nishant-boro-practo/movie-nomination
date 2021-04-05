const express = require("express");
const path = require("path");
const request = require("request");

const app = express();
const publicpath = path.join(__dirname, "..", "dist");

const port = process.env.PORT || 3000;

app.use(express.static(publicpath));

app.get("*", (req, res) => {
  if (req.path === "/search-movie/") {
    request(
      `http://www.omdbapi.com/?apikey=94c39b02&s=${req.query.title}&type=movie`,
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          res.send(response.body);
        }
      }
    );
  } else {
    res.sendFile(path.join(publicpath, "index.html"));
  }
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
