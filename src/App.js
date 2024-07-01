import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [amount, setAmount] = useState("");
  const [btcPrice, setBtcPrice] = useState(null);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        const bitcoin = json.find((coin) => coin.symbol === "BTC");
        setBtcPrice(bitcoin.quotes.USD.price);
        setLoading(false);
      });
  }, []);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const calculateBTC = () => {
    if (btcPrice && amount) {
      return amount / btcPrice;
    }
    return 0;
  };

  return (
    <div>
      <h1>The Coin Calculator {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <>
          <select>
            {coins.map((coin) => (
              <option key={coin.id}>
                {coin.name} ({coin.symbol}): ${coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
          <div>
            <input
              type="number"
              placeholder="Amount in USD"
              value={amount}
              onChange={handleAmountChange}
            />
            <p>
              You can get {calculateBTC()} BTC for ${amount}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
