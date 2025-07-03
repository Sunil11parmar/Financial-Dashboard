import React, { useState } from 'react';
import StockList from './components/StockList';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [stocksToTrack, setStocksToTrack] = useState(['AAPL', 'MSFT', 'GOOGL']);

  const handleAddStock = (symbol) => {
    if (!stocksToTrack.includes(symbol)) {
      setStocksToTrack([...stocksToTrack, symbol]);
    }
  };

  return (
    <div className="app">
      <h1>Financial Dashboard</h1>
      <SearchBar onSearch={handleAddStock} />
      <StockList stocksToTrack={stocksToTrack} />
    </div>
  );
}

export default App;