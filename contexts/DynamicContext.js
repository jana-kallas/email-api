import React, { createContext, useContext, useState } from 'react';

// Create a context for the dynamic data
const DynamicDataContext = createContext();

// Step 2: Create a context provider
export function DynamicDataProvider({ children }) {
  // State to manage the dynamic data
  const [dynamicData, setDynamicData] = useState({
    EURUSD: '',
    AUDCAD: '',
    XAUUSD: '',
    eur_buyers: '',
    eur_sellers: '',
  });

  // You can add any other functions or logic related to dynamicData here

  return (
    // Step 3: Wrap your application with the context provider
    <DynamicDataContext.Provider value={{ dynamicData, setDynamicData }}>
      {children}
    </DynamicDataContext.Provider>
  );
}

// Step 4: Access the context in child components
function ChildComponent() {
  // Access the dynamicData and setDynamicData functions from the context
  const { dynamicData, setDynamicData } = useContext(DynamicDataContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update dynamicData using setDynamicData
    setDynamicData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Render your component using dynamicData
  return (
    <div>
      <input
        type="text"
        name="EURUSD"
        value={dynamicData.EURUSD}
        onChange={handleInputChange}
      />
      {/* Add other inputs for different data fields */}
    </div>
  );
}