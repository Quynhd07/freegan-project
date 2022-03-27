// const express = require("express");
// const { getParsedData } = require("./scraper/scraper.ts");
import express from 'express';
import { getParsedData }  from './scraper/mainScraper.js'

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", async (req, res) => {
    const data = await getParsedData();
    console.log('/api: ', data )
    res.json({ message: data });
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});