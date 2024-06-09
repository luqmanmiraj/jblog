import React, { createContext, useState } from 'react';

export const CategoryContext = createContext();
export const SubCategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [crumbcategory, setCategory] = useState('');
  const [crumbsubcategory, setSubcategory] = useState('');

  return (
    <CategoryContext.Provider value={{ crumbcategory, setCategory }}>
      <SubCategoryContext.Provider value={{ crumbsubcategory, setSubcategory }}>
        {children}
      </SubCategoryContext.Provider>
    </CategoryContext.Provider>
  );
};
