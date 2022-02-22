//const express = require('express')

import express from "express";
import cors from "cors";
import Krepsinis from "./krepsinis.js";
import { writeFile as wf, readFile, stat } from "fs";

const app = express();

app.use(cors());
app.use("/img", express.static("img"));

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.json()); //automatinis stringo konvertavimas i objekta

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const rezultatas = new Krepsinis();
//console.log(rezultatas);

app.get("/checkscore", function (req, res) {
  res.json({ rezultatas });
});

app.post("/post-request", (req, res) => {
  let obj = {
    logo: {
      flogo: "http://localhost:3001/img/Olympiacos.png",
      slogo: "http://localhost:3001/img/Istanbul.png",
    },
  };

  console.log("body", req.body);
  let message = "";
  let reqbody = req.body;
  if (req.body.time >= "18:00" && req.body.time <= "21:30") {
    console.log("laikas tinkamas");
    res.json({ reqbody, obj, pavyko: true });
  } else {
    console.log("Netinkamas rungtyniu laikas");
    message = "Netinkamas rungtyniu laikas";

    res.json({ message, pavyko: false });
  }
});

// app.get("/", (req, res) => {
//   res.send('test')
// })

app.post("/save-request", (req, res) => {
  // let data = JSON.parse(req.body)
console.log("req", req.body)
  wf("./db/data.json", JSON.stringify(req.body), "utf8", (err) => {
    //console.log("err", err)
    if (!err) {
      res.json("Informacija issaugota");
    } else {
      res.json("Nepavyko sukurti failo");
    }
  });
});

app.listen(3001);
