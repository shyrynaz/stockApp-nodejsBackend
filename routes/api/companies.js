const express = require("express");
const router = express.Router();
const { getCompanyData } = require("../../services/companyDataService");
const {
  getStockData,
  getSectorPerformance,
  getGainersList,
  getLosersList
} = require("../../services/stockService");
const {
  getCompanyInfo,
  getChartData,
  getCompanySentiment,
  getCompanyProfile
} = require("../../services/companyInfoService");
/**
 * Retrieves the stock data
 */
router.get("/stockData", async (req, res) => {
  var stockData = await getStockData().catch(err =>
    console.log("could not get stock data")
  );
  res.send(stockData);
});

/**
 * Retrieves sector performance
 */
router.get("/sectorPerformance", async (req, res) => {
  var sectorPerformance = await getSectorPerformance().catch(err =>
    console.log("error getting sector data")
  );

  res.send(sectorPerformance);
});

/**
 * Retrieves a list of gaining stock
 */
router.get("/gainers", async (req, res) => {
  var gainers = await getGainersList().catch(err =>
    console.log("no gainers found")
  );

  res.send(gainers);
});

router.post("/companyProfile", async (req, res) => {
  const symbol = req.body.symbol;
  var companyProfile = await getCompanyProfile(symbol).catch(err =>
    console.log("no data found")
  );

  res.send(companyProfile);
});

/**
 * Retrieves a list of losing stocks
 */
router.get("/losers", async (req, res) => {
  var losers = await getLosersList().catch(err =>
    console.log("no losers found")
  );

  res.send(losers);
});

/**
 * Retrieves the list of all companies
 */
router.get("/companyNames", (req, res) => {
  var companiesData = getCompanyData();
  res.send(companiesData);
});

/**
 * retrieves Company news based on passed symbol
 */
router.post("/companyInfo", async (req, res) => {
  const symbol = req.body.symbol;
  // console.log(symbol);
  var companyInfo = await getCompanyInfo(symbol).catch(err =>
    console.log("error fetching company info")
  );
  res.send(companyInfo);
});
/**
 * Retreives chart data of a given company
 */
router.post("/chartData", async (req, res) => {
  const symbol = req.body.symbol;
  var chartData = await getChartData(symbol).catch(err =>
    console.log("could not fetch chart data")
  );
  res.send(chartData);
});
/**
 * Retrieves sentiment data of a given company
 */
router.post("/sentimentData", async (req, res) => {
  const symbol = req.body.symbol;
  var sentimentData = await getCompanySentiment(symbol).catch(err =>
    console.log("could not fetch sentiment data")
  );

  res.send(sentimentData);
});

module.exports = router;
