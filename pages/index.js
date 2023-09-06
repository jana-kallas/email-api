import { useEffect, useState } from 'react';
// import "/scss/styles.scss"

function Home() {
  const [dynamicData, setDynamicData] = useState({
    EURUSD: '',
    AUDCAD: '',
    XAUUSD: '',
    eur_buyers: '',
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDynamicData({
      ...dynamicData,
      [name]: value,
    });
  };

  const calculateAndSendData = () => {
    // Calculate eur_sellers if eur_buyers is provided
    const eurBuyersValue = parseFloat(dynamicData.eur_buyers);
    if (!isNaN(eurBuyersValue)) {
      const eurSellersValue = Math.round(100 - eurBuyersValue).toFixed(0);
      // Send eur_sellers value along with other data to the Mailchimp API
      const dataToSend = {
        ...dynamicData,
        eur_sellers: eurSellersValue,
      };

      fetch("/api/mailchimp", {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dynamicData: dataToSend }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Mailchimp API request failed with status ${response.status}`);
          }
          return response.json();
        })
        .then((apiData) => {
          setResponseMessage('Template updated successfully!');
        })
        .catch((error) => {
          console.error(error);
          setResponseMessage('An error occurred while updating the template.');
        });
    } else {
      setResponseMessage('Please enter a valid eur_buyers value.');
    }
  };

  return (
    <div>
      <h1>Update Mailchimp Template</h1>
      {responseMessage && <p>{responseMessage}</p>}
      <form className="trendy-form">
        {Object.entries(dynamicData).map(([key, value]) => (
          <div key={key} className="form-group">
            <label htmlFor={key} className="form-label">
              {key}:
            </label>
            <input
              type="text"
              id={key}
              name={key}
              value={value}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
        ))}
        <button type="button" onClick={calculateAndSendData} className="form-button">
          Send
        </button>
      </form>
    </div>
  );
}

export default Home;
