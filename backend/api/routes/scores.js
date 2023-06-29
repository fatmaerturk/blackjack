const express = require("express");
const router = express.Router();
var fs = require("fs");


router.get("/", (req, res, next) => {
  fs.readFile(__dirname + "/" + "DB.json", "utf8", function (err, data) {
    console.log(data);
    res.end(data); 
    return;
  });
});

router.post("/", (req, res, next) => {
  const score = {
    playerName: req.body.playerName,
    playerScore: req.body.playerScore,
    dealerScore: req.body.dealerScore,
  };
  var round = req.body.round;
  res.status(201).json({
    message: "Handling POST requests to /scores",
    score: score,
  });
  fs.readFile(__dirname + "/" + "DB.json", "utf8", function (err, data) {
    data = JSON.parse(data);
    //append scores variable to list
    data["Round" + String(round)] = score;
    res.end(JSON.stringify(data));
    fs.writeFile(__dirname + "/" + "DB.json", JSON.stringify(data), finished);
  });
  function finished(err) {
    console.log("all set");
  }
});

module.exports = router;
