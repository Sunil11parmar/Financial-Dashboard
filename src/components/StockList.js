import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StockCard from './StockCard';

const API_KEY = 'IAATSELQY5QAMNEW'; // Replace with your API key

const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStockData = async (symbol) => {
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
      );
      const data = response.data['Global Quote'];
      return {
        symbol: data['01. symbol'],
        price: data['05. price'],
        changePercent: data['10. change percent'].replace('%', ''),
        volume: data['06. volume']
      };
    } catch (err) {
      console.error(`Error fetching data for ${symbol}:`, err);
      return null;
    }
  };


  const fetchAllStocks = async () => {
    setLoading(true);
    try {
      const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA']; // Default stocks
      const stockData = await Promise.all(symbols.map(fetchStockData));
      setStocks(stockData.filter(Boolean));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStocks();
    
    // Set up interval for real-time updates (every 5 minutes)
    const interval = setInterval(fetchAllStocks, 300000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="stock-list">
      {stocks.map((stock) => (
        <StockCard key={stock.symbol} stock={stock} />
      ))}
    </div>
  );
};

export default StockList;