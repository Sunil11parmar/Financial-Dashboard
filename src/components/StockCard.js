import React from 'react';

const StockCard = ({ stock }) => {
  const isPositive = parseFloat(stock.changePercent) > 0;

  return (
    <div className="stock-card">
      <h3>{stock.symbol}</h3>
      <p className="price">${stock.price}</p>
      <p className={isPositive ? 'positive' : 'negative'}>
        {stock.changePercent}%
      </p>
      <p>Volume: {stock.volume}</p>
    </div>
  );
};

export default StockCard;