// const express = require("express");
// const { getParsedData } = require("./scraper/scraper.ts");
import express from 'express';
import { getParsedData }  from './scraper/scraper.js'

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
    const data = getParsedData();
    res.json({ message: 'hello' });
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});