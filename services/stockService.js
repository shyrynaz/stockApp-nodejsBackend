const axios = require("axios");

class StockService {
  async getStockData() {
    const symbols = [
      "AAPL",
      "MSFT",
      "AMD",
      "PLAB",
      "FB",
      "GOOGL",
      "TSLA",
      "PLAB",
      "YI",
      "ADBE"
    ];
    const url = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbols}&types=quote`;
    let response = await axios.get(url);

    let stockData = response.data;
    const data = Object.values(stockData);
    const stocks = data.map((item, index) => {
      return item.quote;
    });

    return stocks;
  }

  async getSectorPerformance() {
    const url = `https://cloud.iexapis.com/stable/stock/market/sector-performance?token=${
      process.env.IEX_CLOUD_API
    }`;

    let response = await axios.get(url);
    const sectorPerformance = response.data;

    // console.log(sectorPerformance)
    return sectorPerformance;
  }

  async getGainersList() {
    const url = `https://cloud.iexapis.com/stable/stock/market/list/gainers?token=${
      process.env.IEX_CLOUD_API
    }`;
    let response = await axios.get(url);

    const gainersList = response.data;

    return gainersList;
  }

  async getLosersList() {
    const url = `https://cloud.iexapis.com/stable/stock/market/list/losers?token=${
      process.env.IEX_CLOUD_API
    }`;
    let response = await axios.get(url);

    const losersList = response.data;

    return losersList;
  }
}
module.exports = new StockService();
