import React, { createContext, useState, useEffect } from 'react';
import DummyData from './DummyData.json'; // Replace with your actual data source

const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(DummyData);
    }, []);
    
  const handleCategoryPress = (category) => {
    navigation.navigate("SubCategories", { category }); // This line is incorrect (fix below)
  };

    return (
        <DataContext.Provider value={{ data , handleCategoryPress}}>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataProvider };
