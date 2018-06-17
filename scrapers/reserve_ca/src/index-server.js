import express from "express";
import bodyParser from "body-parser";

import Scraper from "./scraper.js";

const app = express();
const port = 3003;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post("/scrape", (req, res) => {
  console.log("req", req.body);
  let params = req.body;
  new Scraper(params)
    .scrape()
    .catch(e => {
      console.log("Scrape fail...", e);
    })
    .then(result => {
      console.log("Scrape complete...");
    });
  res.send({ some: 'json' });
});

app.listen(port, () => {
  console.log("process.env", process.env);
  console.log(
    `${process.env.NODE_APP_INSTANCE} server is listening on ${port}`
  );
});
